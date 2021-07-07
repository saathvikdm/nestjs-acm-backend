import { IsNotEmpty } from 'class-validator'; // Find all validations from the class-validator page within TypeStack Github

// Not to forget to include "app.useGlobalPipes(new ValidationPipe());" or other methods of including pipes for the validation to actually work.

export class CreateEventDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}
