import {Element} from "@angular/compiler";

declare namespace Cypress {
  interface Chainable<Subject = string> {
    login(): Chainable<Element>;
    completeStoryForm():Chainable<Element>
    navigateToStories(navigate:string):Chainable<Element>
  }
}
