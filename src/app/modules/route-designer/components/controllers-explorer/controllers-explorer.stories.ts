import { storiesOf, moduleMetadata } from '@storybook/angular';
import { ControllersExplorerComponent } from './controllers-explorer.component';
import { MaterialModule } from '../material/material.module';
import { SuiPopupModule } from 'ng2-semantic-ui';
import { action } from '@storybook/addon-actions';
import { ILoadable, IController } from '../../route-designer.model';
import { withKnobs, object, array } from '@storybook/addon-knobs';

export const entriesFoldersNotLoaded: ILoadable[] = [
  {
    name: 'devtools',
    type: 'folder',
    loaded: false,
    children: [],
    loading: true
  },
  {
    name: 'Example',
    type: 'file',
    loaded: false,
    children: [],
    loading: true
  }
];
export const entriesFoldersLoadedScanned: ILoadable[] = [
  {
    name: 'devtools',
    type: 'folder',
    loaded: true,
    children: [],
    loading: false
  },
  {
    name: 'Example',
    type: 'file',
    loaded: true,
    children: [],
    loading: false
  }
];
export const entriesFoldersLoadedNotScanned: ILoadable[] = [
  {
    name: 'devtools',
    type: 'folder',
    loaded: false,
    children: [],
    loading: false
  },
  {
    name: 'Example',
    type: 'file',
    loaded: false,
    children: [],
    loading: false
  }
];

export const entriesFiles: ILoadable[] = [
  {
    name: 'doc-extractor.server.controller.js',
    type: 'file',
    loaded: true,
    children: [],
    loading: false
  },
  {
    name: 'controllers.server.controller.js',
    type: 'file',
    loaded: true,
    children: [],
    loading: false
  }
];
export const fileWithController: ILoadable[] = [
  {
    name: 'oneController.js',
    type: 'file',
    loaded: true,
    children: [
      {
        title: 'ok1',
        type: 'controller',
        description: 'Simple request check, just send a "true" word',
        name: 'Check results',
        params: [
          { name: 'req', description: 'The request', type: 'IncommingMessage' },
          {
            name: 'res',
            description: 'The response',
            type: 'OutcommingMessage'
          },
          {
            name: 'next',
            description: 'Go to the next middleware',
            type: 'Function'
          }
        ]
      }
    ],
    loading: false
  }
];

export const controllersList: IController[] = [
  {
    title: 'ok1',
    type: 'controller',
    description: 'Simple request check, just send a "true" word',
    name: 'Check results',
    params: [
      { name: 'req', description: 'The request', type: 'IncommingMessage' },
      { name: 'res', description: 'The response', type: 'OutcommingMessage' },
      {
        name: 'next',
        description: 'Go to the next middleware',
        type: 'Function'
      }
    ]
  }
];
export const actions = {
  select: action('select')
};

const stories = storiesOf('ControllersExplorerComponent', module);
stories.addDecorator(withKnobs);
stories
  .addDecorator(
    moduleMetadata({
      imports: [MaterialModule, SuiPopupModule],
      declarations: [ControllersExplorerComponent]
    })
  )
  .add('Empty list', () => {
    return {
      component: ControllersExplorerComponent,
      props: {}
    };
  })
  .add('On loading Folders/Files', () => {
    return {
      template: `<div width="100px">
      <app-controllers-explorer
      [entries]="entriesFoldersNotLoaded"
      (select)="select($event)"
    ></app-controllers-explorer></div>
    `,
      props: {
        entriesFoldersNotLoaded: object('entries', entriesFoldersNotLoaded),
        select: actions.select
      }
    };
  })
  .add('Loaded & Not Scanned Folders/Files list', () => {
    return {
      template: `<div width="100px">
      <app-controllers-explorer
      [entries]="entriesFoldersLoadedNotScanned"
      (select)="select($event)"
    ></app-controllers-explorer></div>
    `,
      props: {
        entriesFoldersLoadedNotScanned: object(
          'entries',
          entriesFoldersLoadedNotScanned
        ),
        select: actions.select
      }
    };
  })
  .add('Scanned Folders/Files list', () => {
    return {
      template: `<div width="100px">
      <app-controllers-explorer
      [entries]="entriesFoldersLoadedScanned"
      (select)="select($event)"
    ></app-controllers-explorer></div>
    `,
      props: {
        entriesFoldersLoadedScanned: object(
          'entries',
          entriesFoldersLoadedScanned
        ),
        select: actions.select
      }
    };
  })
  .add('Scanned files - 0 Controller', () => {
    return {
      template: `<div width="100px">
      <app-controllers-explorer
      [entries]="entriesFiles"
      (select)="select($event)"
    ></app-controllers-explorer></div>
    `,
      props: {
        entriesFiles: object('entries', entriesFiles),
        select: actions.select
      }
    };
  })
  .add('file item including one controller', () => {
    return {
      template: `<div width="100px">
      <app-controllers-explorer
      [entries]="fileWithController"
      (select)="select($event)"
    ></app-controllers-explorer></div>
    `,
      props: {
        fileWithController: object('entries', fileWithController),
        select: actions.select
      }
    };
  })
  .add('one controller with 3 params', () => {
    return {
      template: `<div width="100px">
      <app-controllers-explorer
      [entries]="controllersList"
      (select)="select($event)"
    ></app-controllers-explorer></div>
    `,
      props: {
        controllersList: object('entries', controllersList),
        select: actions.select
      }
    };
  });
