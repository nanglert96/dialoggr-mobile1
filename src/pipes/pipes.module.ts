import { NgModule } from '@angular/core';
import { MillisecondsToHoursPipe } from './milliseconds-to-hours/milliseconds-to-hours';
@NgModule({
	declarations: [MillisecondsToHoursPipe],
	imports: [],
	exports: [MillisecondsToHoursPipe]
})
export class PipesModule {}
