import { storiesOf, moduleMetadata } from '@storybook/angular';
import { BreadcrumbComponent } from './breadcrumb.component';
import { action } from '@storybook/addon-actions';
import { MaterialModule } from '../material/material.module';
import { withKnobs, text } from '@storybook/addon-knobs';

export const currentUrl = '/api/v1/devtools/controllers';
export const actions = {
  goToUrl: action('goToUrl')
};
const stories = storiesOf('BreadcrumbComponent', module);
stories.addDecorator(withKnobs);
stories
  .addDecorator(
    moduleMetadata({
      imports: [MaterialModule],
      declarations: [BreadcrumbComponent]
    })
  )
  .add('Default Breadcrumb', () => {
    return {
      template: `<app-breadcrumb
      [currentUrl]="currentUrl"
      (goToUrl)="goToUrl($event)"
      ></app-breadcrumb>`,
      props: {
        currentUrl: text('text'),
        goToUrl: actions.goToUrl
      }
    };
  })
  .add('Breadcrumb with url', () => {
    return {
      template: `<app-breadcrumb
      [currentUrl]="currentUrl"
      (goToUrl)="goToUrl($event)"
    ></app-breadcrumb>`,
      props: {
        currentUrl: text('text', currentUrl),
        goToUrl: actions.goToUrl
      }
    };
  });
