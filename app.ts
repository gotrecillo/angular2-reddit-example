import { NgModule, Component, HostBinding, Input } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

@Component({
    selector : 're-app',
    template : `
        <form class="ui large form segment">
            <h3 class="ui header">Add a Link</h3>
            
            <div class="field">
                <label for="title">Title:</label>
                <input type="text" name="title" #title>
            </div>
            <div class="field">
                <label for="link">Link:</label>
                <input type="text" name="link" #link>
            </div>
            
            <button (click)="addArticle(title, link)"
                class="ui positive right floated button">
                Submit link
            </button>
        </form>
        <div class="ui grid posts">
            <re-article *ngFor="let article of sortedArticles()" [article]="article"></re-article>
        </div>
        `,
})
class AppComponent {
    public articles: Article[];

    constructor() {
        this.articles = [
            new Article('Angular 2', 'http://angular.io', 3),
            new Article('Fullstack', 'http://fullstack.io', 2),
            new Article('Angular Homepage', 'http://angular.io', 1),
        ];
    }

    public addArticle(title: HTMLInputElement, link: HTMLInputElement): boolean {
        this.articles.push(new Article(title.value, link.value, 0));

        title.value = '';
        link.value = '';

        return false;
    }

    public sortedArticles(): Article[] {
        return this.articles.sort((a: Article, b: Article) => b.votes - a.votes);
    }
}

@Component({
    selector : 're-article',
    template : `
    <div class="four wide column center aligned votes">
        <div class="ui statistic">
            <div class="value">
                {{ article.votes }}
            </div>
            <div class="label">
                Points
            </div>
        </div>
    </div>
    <div class="twelve wide column">
        <a href="{{ article.link }}" class="ui large header">
            {{ article.title }}
        </a>
        <div class="meta">({{ article.domain() }})</div>
        <ul class="ui big horizontal list voters">
            <li class="item">
                <a href (click)="voteUp()">
                    <i class="arrow up icon"></i>
                    upvote
                </a>
            </li>
            <li class="item">
                <a href (click)="voteDown()">
                    <i class="arrow down icon"></i>
                    downvote
                </a>
            </li>
        </ul>
    </div>
    `
})
class ArticleComponent {
    @HostBinding('class') cssClass = 'row';
    @Input() article: Article;

    public article: Article;

    public voteUp(): boolean {
        this.article.voteUp();
        return false;
    }

    public voteDown(): boolean {
        this.article.voteDown();
        return false;
    }
}

class Article {
    public votes: number;
    public title: string;
    public link: string;

    constructor(title: string, link: string, votes?: number) {
        this.title = title;
        this.link  = link;
        this.votes = votes || 0;
    }

    public voteUp(): void {
        this.votes += 1;
    }

    public voteDown(): void {
        this.votes -= 1;
    }

    public domain(): string{
        try {
            const link: string = this.link.split('//')[1];
            return link.split('/')[0];
        } catch (err) {
            return null;
        }
    }
}

@NgModule({
    declarations : [ AppComponent, ArticleComponent ],
    imports      : [ BrowserModule ],
    bootstrap    : [ AppComponent ],
})
class AppModule {
}

platformBrowserDynamic().bootstrapModule(AppModule);
