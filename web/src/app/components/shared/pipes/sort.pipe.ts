import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'sort'
})
export class SortPipe implements PipeTransform {
    transform(items: Array<any>, key?: string, sort_type?: string): Array<any> {
        let _key;
        let _sort_type;

        if (typeof key === "object") {
            _key = key[0];
            _sort_type = key[1];
        } else {
            _key = key;
            _sort_type = sort_type;
        }

        if (!_key) {
            _key = 'sort'
        }

        if (!_sort_type) {
            _sort_type = "asc";
        }

        items.sort((a: any, b: any) => {
            let _a = a;
            let _b = b;
            if (typeof a !== "object") {
                _a = typeof a == "string" ? a.toLowerCase() : a;
                _b = typeof b == "string" ? b.toLowerCase() : b;

            } else {
                for (let k of _key.split(".")) {
                    _a = _a[k];
                    _b = _b[k];
                }
                _a = typeof _a == "string" ? _a.toLowerCase() : _a;
                _b = typeof _b == "string" ? _b.toLowerCase() : _b;
            }

            if (_sort_type instanceof Array) {
                let index_a = _sort_type.indexOf(_a);
                let index_b = _sort_type.indexOf(_b);
                if (index_a < index_b) {
                    return -1
                } else if (index_a > index_b) {
                    return 1
                } else {
                    return 0
                }
            } else {
                if (_a < _b) {
                    return _sort_type == 'asc' ? -1 : 1;
                } else if (_a > _b) {
                    return _sort_type == 'asc' ? 1 : -1;
                } else {
                    return 0;
                }
            }


        });
        return items;
    }


}


