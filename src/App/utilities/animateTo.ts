export const animateTo = (
    element: HTMLElement,
    keyframes: Keyframe[] | PropertyIndexedKeyframes,
    options: KeyframeAnimationOptions,
    onfinish?: () => void
): void => {
    const animation = element.animate(keyframes, { ...options, fill: "forwards" });
    animation.onfinish = () => {
        animation.commitStyles();
        animation.cancel();
        onfinish?.();
    }
    // return animation;

};
