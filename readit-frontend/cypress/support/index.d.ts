import {Element} from "@angular/compiler";

declare namespace Cypress {
  interface Chainable<Subject = string> {
    login(): Chainable<Element>;
    completeStoryForm():Chainable<Element>
    uploadFile( subject: any, fileName: any, fileType: string):Chainable<Element>
  }
}
