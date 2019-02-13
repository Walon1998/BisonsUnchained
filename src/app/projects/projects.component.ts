import {Component, OnInit} from '@angular/core';
import {Project} from './Project';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  private Projects: Array<Project>;
  name = new FormControl('', [Validators.required]);
  Message: FormGroup;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver, private fb: FormBuilder) {
    this.Message = fb.group({
      name: this.name,
    });
  }

  ngOnInit() {
    this.Projects = this.getAllProjects();
  }

// Returns all projects in an array!
  private getAllProjects(): Array<Project> {
    return undefined;
  }

  // Adds a new Project to the Blockchain
  add(projectname: string): boolean {
    return true;
  }

  // Vote woih amout of token on a given project
  voteOn(projectname: string, amount: number): boolean {
    return true; // AY, DY
  }


  commit() {
    if (this.Message.valid) {
      if (this.add(this.name.value)) {
        alert('You added' + this.name.value + 'to the community projects');
        this.Message.reset();
      }


    } else {
      alert('Error');
    }

  }
}
