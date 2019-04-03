import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'matchesName'
})
export class MatchesNamePipe implements PipeTransform {
    transform(items: Array<any>, name: string): Array<any> {
        return items.filter(item => this.check(item, name));
    }

    check(item: any, name: string): boolean {
        name = name.trim();
        if (name == "") {
            return true;
        }
        let nsplit = name.split(" ");
        if (nsplit.length > 1) {
            return item.name.toLowerCase().indexOf(name.toLowerCase()) > -1;
        }
        let split = item.name.split(" ");
        for (let i in split) {
            if (split[i].toLowerCase().indexOf(name.toLowerCase()) === 0) {
                return true;
            }
        }
        return false;
    }
}

