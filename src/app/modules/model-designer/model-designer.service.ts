import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const PREFIX = '/devtools';

@Injectable()
export class ModelDesignerService {
  constructor(private http: HttpClient) {}
}
