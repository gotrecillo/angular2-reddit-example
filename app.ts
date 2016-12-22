import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

@Component({
    selector : 're-hello-world',
    template : `
        <div>
            Hello {{ name }}
        </div>
        `,
})
class HelloWorld {
    name: string;

    public constructor() {
        this.name = 'Gotre';
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
