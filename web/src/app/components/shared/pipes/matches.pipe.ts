import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'matches'
})
export class MatchesPipe implements PipeTransform {
    transform(items: Array<any>, query: string, property: string): Array<any> {
        return items.filter(item => this.check(item, query, property));
    }

    check(item: any, query: string, property: string): boolean {
        if (!query) {
            return true;
        }
        query = query.trim();
        let str = item[property];
        if (query == "" || !str) {
            return true;
        }
        return str.toLowerCase().indexOf(query.toLowerCase()) > -1;
    }
}

