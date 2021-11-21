import { useRef, useEffect, useState, MutableRefObject } from "react"
import * as blobs2Animate from "blobs/v2/animate"
import { getColor } from "../utils";

const blobOptions = {
  extraPoints: 4,
  randomness: 1,
}

type Props = {
  color: string;
  size: number;
  duration?: number;
  opacity?: number;
}

const Blob = (props: Props) => {
  const { color, opacity = 1, size, duration = 2000 } = props

  const seedRef = useRef(0);
  const loopAnimation = useRef<any>(null);
  const renderAnimation = useRef<any>(null)
  const animation = useRef<any>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>();

  useEffect(() => {
    console.log('1')
    if (!canvas.current) {
      return;
    }
    console.log('1 true')
    const context = canvas.current?.getContext('2d');
    setCtx(context);
  }, [canvas]);

  useEffect(() => {
    console.log('2')
    if (!ctx) {
      return;
    }

    console.log('2 true', getColor(color, opacity))
    ctx.fillStyle = getColor(color, opacity);
  }, [ctx, color, opacity]);

  useEffect(() => {
    console.log('3')
    if (!ctx) {
      return;
    }

    console.log('3 true')

    animation.current = blobs2Animate.canvasPath();

    seedRef.current = Math.random();

    const config: blobs2Animate.CanvasKeyframe = {
      duration: 0,
      timingFunction: 'ease',
      blobOptions: {
        ...blobOptions,
        size,
        seed: seedRef.current,
      },
    };

    renderAnimation.current = (prevSeedValue: number, currentSeed: MutableRefObject<number>) => {
      ctx.clearRect(0, 0, size, size);
      ctx.fill(animation.current.renderFrame());
      if (prevSeedValue === currentSeed.current) {
        requestAnimationFrame(() => renderAnimation.current(prevSeedValue, currentSeed));
      }
    };

    requestAnimationFrame(() => renderAnimation.current(seedRef.current, seedRef));

      loopAnimation.current = () => {
        animation.current.transition({
          duration,
          timingFunction: 'ease',
          callback: loopAnimation.current,
          blobOptions: {
            ...blobOptions,
            size,
            seed: Math.random(), // new shape for transition
          },
        });
      };
      config.callback = loopAnimation.current;

    animation.current.transition(config);
  }, [ctx, duration, size])

  console.log('canvas', ctx)

  return (
    <canvas
      ref={canvas}
      width={size}
      height={size}
    />
  )
}

export default Blob
