import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

@Component({
    selector : 're-hello-world',
    template : `
        <ul>
            <li *ngFor="let name of names">Hello {{ name }}</li>
        </ul>
        `,
})
class HelloWorld {
    names: string[];

    public constructor() {
        this.names = ['Gotre', 'Gotrecillo', 'Uxy', 'Gotruxy'];
    }
}

@NgModule({
    declarations : [ HelloWorld ],
    imports      : [ BrowserModule ],
    bootstrap    : [ HelloWorld ],
})

class HelloWorldAppModule {
}

platformBrowserDynamic().bootstrapModule(HelloWorldAppModule);
