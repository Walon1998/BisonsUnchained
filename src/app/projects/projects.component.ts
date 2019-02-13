import {Component, OnInit} from '@angular/core';
import {Project} from './Project';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AccountService} from '../account.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  private Projects: Array<Project> = [];
  name = new FormControl('', [Validators.required]);
  Message: FormGroup;
  displayedColumns: string[] = ['name', 'Votes', 'AddVote'];
  private privateKey: string;
  private publicKey: string;

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
    this.Projects.push(new Project('Name', 1));
    this.Projects.push(new Project('Name2', 2));
    this.Projects.push(new Project('Name3', 3));
    this.privateKey = this.accountservice.getprivateKey();
    this.publicKey = this.accountservice.getPublicKey();
  }

// Returns all projects in an array!
  private getAllProjects(): Array<Project> {
    const Projects: Array<Project> = [];
    // TODO: Phillipe
    return Projects;
  }

  // Adds a new Project to the Blockchain
  add(projectname: string): boolean {
    // TODO: Phillipe
    return false;
  }

  // Vote woih amout of token on a given project
  voteOn(projectname: string, amount: number): boolean {
    // TODO: Phillipe
    return false; // AY, DY
  }


  AddButton() {
    if (this.Message.valid) {
      if (this.add(this.name.value)) {
        alert('You added' + this.name.value + 'to the community projects');
        this.Message.reset();
        this.getAllProjects();
      } else {
        alert('Error');
      }

    } else {
      alert('Add a name');
    }

  }

  TablePlusTapped(name: string) {
    if (this.voteOn(name, 1)) {
      alert('You spent one Token on' + name);
      this.getAllProjects();

    } else {
      alert('Error');
    }
  }
}
