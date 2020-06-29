import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-postman-key',
  templateUrl: './postman-key.component.html',
  styleUrls: ['./postman-key.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostmanKeyComponent {
  key = '';
  postmanDocUrl = 'https://learning.postman.com/docs/postman/postman-api/intro-api/#generating-a-postman-api-key';
  postmanKeyUrl = 'https://web.postman.co/settings/me/api-keys';

  constructor(
    public dialogRef: MatDialogRef<PostmanKeyComponent>
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
