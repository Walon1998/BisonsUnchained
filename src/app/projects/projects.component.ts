import {Component, Inject, OnInit} from '@angular/core';
import {Project} from './Project';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AccountService} from '../account.service';
import {WEB3} from './web3';
import Web3 from 'web3';
import {ABIFile} from './ABIFile';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  Projects: Array<Project> = [];
  name = new FormControl('', [Validators.required]);
  Message: FormGroup;
  displayedColumns: string[] = ['name', 'Votes', 'AddVote'];
  private privateKey: string;
  private publicKey: string;
  public Tokencount: number;
  private projectsContract: any;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver,
              private fb: FormBuilder, private accountservice: AccountService,
              @Inject(WEB3) private web3: Web3) {
    this.Message = fb.group({
      name: this.name,
    });
  }

  async ngOnInit() {
    this.Projects = this.getAllProjects();
    this.Projects.push(new Project('Doctor Office', 1));
    this.Projects.push(new Project('Kindergarden', 2));
    this.Projects.push(new Project('Freshwater filter', 3));
    this.privateKey = this.accountservice.getprivateKey();
    this.publicKey = this.accountservice.getPublicKey();
    this.accountservice.updatedTokencount();
    this.Tokencount = this.accountservice.getTokenCount();

    if ('enable' in this.web3.currentProvider) {
      await this.web3.currentProvider.enable();
    }
    const accounts = await this.web3.eth.getAccounts();
    console.log(accounts);


    if (typeof this.web3 !== 'undefined') {
      console.log('Web3 Detected! ' + this.web3.currentProvider.constructor.name);
      // TODO Philipp
      // const projectsAddress = '0x1611d14ADc2A1a1d5947303DB2180e43AA0f1D5E'; // bleibt die Adresse auch bei Updates des Contracts...?
      const projectsAddress = '0x66c0289d738e7d26ba52c644da712268af34c9dd';
      this.projectsContract = new this.web3.eth.Contract(ABIFile, projectsAddress); // initalize contract
    } else {
      console.log('No Web3 Detected... using HTTP Provider');
      alert('Please install Metamask, you stupid! Visit https://metamask.io/');
      // window.web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/<APIKEY>'));
    }
  }

// Returns all projects in an array!
  private getAllProjects(): Array<Project> {
    const Projects: Array<Project> = [];
    return Projects;

    // TODO: Philipp
    this.Projects = this.projectsContract.lookAtActiveProposals((error, result) => {
      if (!error) {
        console.log(JSON.stringify(result));
      } else {
        console.error(error);
      }
    });
    return this.Projects;
  }

  // Adds a new Project to the Blockchain
  addProject(projectname: string): boolean {
    // TODO: Philipp
    // projectsContracts.createProposal()
    return false;
  }

  // Vote woih amout of token on a given project
  voteOnProject(projectname: string, amount: number): boolean {
    // TODO: Philipp
    const hello = this.projectsContract.incrementVotes(0, (error, result) => {
      if (!error) {
        console.log(JSON.stringify(result));
      } else {
        console.error(error);
      }
    });
    return false; // AY, DY
  }


  AddButton() {
    if (this.Message.valid) {
      if (this.addProject(this.name.value)) {
        alert('You added' + this.name.value + 'to the community projects');
        this.Message.reset();
        this.getAllProjects();
        this.accountservice.updatedTokencount();
        this.Tokencount = this.accountservice.getTokenCount();
      } else {
        alert('Error');
        this.Message.reset();
      }

    } else {
      alert('Add a name');
    }

  }

  TablePlusTapped(name: string) {
    if (this.voteOnProject(name, 1)) {
      alert('You spent one Token on' + name);
      this.getAllProjects();
      this.accountservice.updatedTokencount();
      this.Tokencount = this.accountservice.getTokenCount();
    } else {
      alert('Error');
    }
  }
}
