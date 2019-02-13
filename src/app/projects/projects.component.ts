import {Component, OnInit} from '@angular/core';
import {Project} from './Project';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  private Projects: Array<Project>;

  constructor() {
  }

  ngOnInit() {
    this.Projects = this.getAllProjects();
  }

  private getAllProjects(): Array<Project> {
    return undefined;
  }

  add(projectname: string): boolean {
    return true;
  }

  voteOn(projectname: string, amount: number): boolean {
    return true;
  }


}
