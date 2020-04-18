import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const PREFIX = '/devtools';

@Injectable()
export class ApiDesignerService {
  constructor(private readonly http: HttpClient) {}
}
