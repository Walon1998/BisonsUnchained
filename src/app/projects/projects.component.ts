import {Component, OnInit} from '@angular/core';
import {Project} from './Project';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AccountService} from '../account.service';


// Check if user has Metamask installed
window.addEventListener('load', function() {
  if (typeof web3 !== 'undefined') {
    console.log('Web3 Detected! ' + web3.currentProvider.constructor.name);
    // TODO Philipp
    //const projectsAddress = '0x1611d14ADc2A1a1d5947303DB2180e43AA0f1D5E'; // bleibt die Adresse auch bei Updates des Contracts...?
    const projectsAddress = '0xbbf289d846208c16edc8474705c748aff07732db';
    projectsContract = web3.eth.contract(projectsABI).at(projectsAddress); // initalize contract
  } else {
    console.log('No Web3 Detected... using HTTP Provider');
    alert('Please install Metamask, you stupid! Visit https://metamask.io/');
    // window.web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/<APIKEY>'));
  }
});

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

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver, private fb: FormBuilder, private accountservice: AccountService) {
    this.Message = fb.group({
      name: this.name,
    });
  }

  ngOnInit() {
    this.Projects = this.getAllProjects();
    this.Projects.push(new Project('Doctor Office', 1));
    this.Projects.push(new Project('Kindergarden', 2));
    this.Projects.push(new Project('Freshwater filter', 3));
    this.privateKey = this.accountservice.getprivateKey();
    this.publicKey = this.accountservice.getPublicKey();
    this.accountservice.updatedTokencount();
    this.Tokencount = this.accountservice.getTokenCount();
  }

// Returns all projects in an array!
  private getAllProjects(): Array<Project> {
    // const Projects: Array<Project> = [];
    // TODO: Philipp
    this.Projects = projectsContract.lookAtActiveProposals((error, result) => {
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
    //projectsContracts.createProposal()
    return false;
  }

  // Vote woih amout of token on a given project
  voteOnProject(projectname: string, amount: number): boolean {
    // TODO: Philipp
    var hello = projectsContracts.incrementVotes(0, (error, result) => {
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
