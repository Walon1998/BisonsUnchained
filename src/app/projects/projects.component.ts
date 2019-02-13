import {Component, OnInit} from '@angular/core';
import {Project} from './Project';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  private Projects: Array<Project>;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver) {
  }

  ngOnInit() {
    this.Projects = this.getAllProjects();
  }

//Returns all projects in an array!
  private getAllProjects(): Array<Project> {
    return undefined;
  }

  //Adds a new Project to the Blockchain
  add(projectname: string): boolean {
    return true;
  }

  //Vote woih amout of token on a given project
  voteOn(projectname: string, amount: number): boolean {
    return true;
  }


}
