/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ReadNewComponent } from './read-new.component';

describe('ReadNewComponent', () => {
  let component: ReadNewComponent;
  let fixture: ComponentFixture<ReadNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
