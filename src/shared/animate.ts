export enum AnimationName {
  Bounce = "bounce",
  Flash = "flash",
  RubberBand = "rubberBand",
  Pulse = "pulse",
  Shake = "shake",
  Swing = "swing",
  Tada = "tada",
  Wobble = "wobble",
  BounceIn = "bounceIn",
  BounceInDown = "bounceInDown",
  BounceInLeft = "bounceInLeft",
  BounceInRight = "bounceInRight",
  BounceInUp = "bounceInUp",
  BounceOut = "bounceOut",
  BounceOutDown = "bounceOutDown",
  BounceOutLeft = "bounceOutLeft",
  BounceOutRight = "bounceOutRight",
  BounceOutUp = "bounceOutUp",
  FadeIn = "fadeIn",
  FadeInDown = "fadeInDown",
  FadeInDownBig = "fadeInDownBig",
  FadeInLeft = "fadeInLeft",
  FadeInLeftBig = "fadeInLeftBig",
  FadeInRight = "fadeInRight",
  FadeInRightBig = "fadeInRightBig", 
  FadeInUp = "fadeInUp", 
  FadeInUpBig = "fadeInUpBig", 
  FadeOut = "fadeOut", 
  FadeOutDown = "fadeOutDown", 
  FadeOutDownBig = "fadeOutDownBig", 
  FadeOutLeft = "fadeOutLeft", 
  FadeOutLeftBig = "fadeOutLeftBig", 
  FadeOutRight = "fadeOutRight", 
  FadeOutRightBig = "fadeOutRightBig", 
  FadeOutUp = "fadeOutUp", 
  FadeOutUpBig = "fadeOutUpBig", 
  Flip = "flip", 
  FlipInX = "flipInX", 
  FlipInY = "flipInY", 
  FlipOutX = "flipOutX", 
  FlipOutY = "flipOutY", 
  LightSpeedIn = "lightSpeedIn", 
  LightSpeedOut = "lightSpeedOut", 
  RotateIn = "rotateIn", 
  RotateInDownLeft = "rotateInDownLeft", 
  RotateInDownRight = "rotateInDownRight", 
  RotateInUpLeft = "rotateInUpLeft", 
  RotateInUpRight = "rotateInUpRight", 
  RotateOut = "rotateOut", 
  RotateOutDownLeft = "rotateOutDownLeft", 
  RotateOutDownRight = "rotateOutDownRight", 
  RotateOutUpLeft = "rotateOutUpLeft", 
  RotateOutUpRight = "rotateOutUpRight", 
  Hinge = "hinge", 
  RollIn = "rollIn", 
  RollOut = "rollOut", 
  ZoomIn = "zoomIn", 
  ZoomInDown = "zoomInDown", 
  ZoomInLeft = "zoomInLeft", 
  ZoomInRight = "zoomInRight", 
  ZoomInUp = "zoomInUp", 
  ZoomOut = "zoomOut", 
  ZoomOutDown = "zoomOutDown", 
  ZoomOutLeft = "zoomOutLeft", 
  ZoomOutRight = "zoomOutRight", 
  ZoomOutUp = "zoomOutUp",
  SlideInDown = "slideInDown",
  SlideInLeft = "slideInLeft",
  SlideInRight = "slideInRight",
  SlideInUp = "slideInUp",
  SlideOutDown = "slideOutDown",
  SlideOutLeft = "slideOutLeft",
  SlideOutRight = "slideOutRight",
  SlideOutUp = "slideOutUp",
  CustomPlusToMinus = "customPlusToMinus",
  CustomMinusToPlus = "customMinusToPlus",
}

export enum AnimationRepeat {
  Infinite = "infinite",
  RepeatOnce = "repeat-1",
  RepeatTwice = "repeat-2",
  RepeatThrice = "repeat-3",
}

export enum AnimationDelay {
  OneSecond = "delay-1s",
  TwoSeconds = "delay-2s",
  ThreeSeconds = "delay-3s",
  FourSeconds = "delay-4s",
  FiveSeconds = "delay-5s",
}

export enum AnimationDuration {
  Slow = "slow",
  Slower = "slower",
  Fast = "fast",
  Faster = "faster",
}

export class Animation {
  constructor(
    public readonly name: AnimationName,
    public readonly repeat?: AnimationRepeat,
    public readonly delay?: AnimationDelay,
    public readonly duration?: AnimationDuration,
    public readonly callback?: (() => void),
  ) { }
}

export function animateElement(el: Element, animation: Animation): void {
  const prefix = 'animate__';
  const animationName = `${prefix}${animation.name}`;
  const animationClasses: Array<string> = [`${prefix}animated`, animationName];

  if (animation.repeat) {
    animationClasses.push(`${prefix}${animation.repeat}`)
  }

  if (animation.delay) {
    animationClasses.push(`${prefix}${animation.delay}`)
  }

  if (animation.duration) {
    animationClasses.push(`${prefix}${animation.duration}`)
  }

  el.classList.add(...animationClasses);

  function handleAnimationEnd(event: Event) {
    event.stopPropagation();
    el.classList.remove(...animationClasses);

    if (animation.callback) {
      animation.callback();
    }
  }

  el.addEventListener('animationend', handleAnimationEnd, { once: true });
}