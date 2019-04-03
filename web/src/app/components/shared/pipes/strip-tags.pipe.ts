import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'stripTags'
})
export class StripTagsPipe implements PipeTransform {

  transform(input: string): any {

	if(typeof input === 'undefined'){
		return input;
	}

    return input.replace(/<\S[^><]*>/g, '');
  }
}
