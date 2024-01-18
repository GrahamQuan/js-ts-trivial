function firstClassDecorator(target: any) {
  console.log('firstClassDecorator');
}

function secondClassDecorator(target: any) {
  console.log('secondClassDecorator');
}

function firstMethodDecorator(
  target: any,
  key: string,
  descriptor: PropertyDescriptor
) {
  console.log('firstMethodDecorator');
}

function secondMethodDecorator(
  target: any,
  key: string,
  descriptor: PropertyDescriptor
) {
  console.log('secondMethodDecorator');
}

@secondClassDecorator
@firstClassDecorator
export class ExampleClass {
  @secondMethodDecorator
  @firstMethodDecorator
  exampleMethod() {
    console.log('hello decorator');
  }
}

const exampleClass = new ExampleClass();
exampleClass.exampleMethod();
