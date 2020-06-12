import { Injectable, ErrorHandler } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '@env/environment';
import { NotificationService } from '../notifications/notification.service';

/** Application-wide error handler that adds a UI notification to the error handling
 * provided by the default Angular ErrorHandler.
 */
@Injectable()
export class AppErrorHandler extends ErrorHandler {
  constructor(private notificationsService: NotificationService) {
    super();
  }

  handleError(error: Error | HttpErrorResponse) {
    const err = error as any;
    let displayMessage = 'An error occurred.';

    if(err.error && err.error.message) {
      displayMessage += ` ${err.error.message}`;
    } else if (!environment.production) {
      displayMessage += ' See console for details.';
    }

    setTimeout(() => {
      if ((<any>error).notify !== false) {
        this.notificationsService.error(displayMessage);
      }
    }, 1);

    super.handleError(error);
  }
}
