import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';


@ValidatorConstraint({ async: true })
export class IsPolygonConstraint implements ValidatorConstraintInterface {
  validate(geometry: any, args: ValidationArguments) {
    return typeof geometry === 'object' &&
      typeof geometry.coordinates === 'object' &&
      geometry.type === 'Polygon'
  }
}

export function IsPolygon(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isPolygon',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: IsPolygon
    });
  };
}
