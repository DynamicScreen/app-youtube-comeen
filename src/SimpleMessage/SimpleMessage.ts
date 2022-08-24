import {
  ISlideContext,
  IPublicSlide,
  SlideModule, VueInstance
} from "dynamicscreen-sdk-js";
import { toRefs } from "vue";
// @ts-ignore

export interface ColorClasses {
  "green": string
  "cyan": string
  "blue": string
  "blue-gray": string
  "indigo": string
  "purple": string
  "pink": string
  "red": string
  "orange": string
  "brown": string
  "yellow": string
  "gray": string
}

export const COLOR_CLASSES: ColorClasses = {
  "green": 'lime-600', // text-lime-600 bg-lime-600 focus:ring-lime-600 border-lime-600
  "cyan": 'teal-400', // text-teal-400 bg-teal-400 focus:ring-teal-400 border-teal-400
  "blue": 'sky-500', // text-sky-500 bg-sky-500 focus:ring-sky-500 border-sky-500
  "blue-gray": 'blueGray-500', // text-blueGray-500 bg-blueGray-500 focus:ring-blueGray-500 border-blueGray-500
  "indigo": 'indigo-700', // text-indigo-700 bg-indigo-700 focus:ring-indigo-700 border-indigo-700
  "purple": 'purple-600', // text-purple-600 bg-purple-600 focus:ring-purple-600 border-purple-600
  "pink": 'pink-500', // text-pink-500 bg-pink-500 focus:ring-pink-500 border-pink-500
  "red": 'red-600', // text-red-600 bg-red-600 focus:ring-red-600 border-red-600
  "orange": 'orange-500', // text-orange-500 bg-orange-500 focus:ring-orange-500 border-orange-500
  "brown": 'yellow-800', // text-yellow-800 bg-yellow-800 focus:ring-yellow-800 border-yellow-800
  "yellow": 'yellow-500', // text-yellow-500 bg-yellow-500 focus:ring-yellow-500 border-yellow-500
  "gray": 'trueGray-400', // text-trueGray-400 bg-trueGray-400 focus:ring-trueGray-400 border-trueGray-400
};

export default class SimpleMessageSlideModule extends SlideModule {

  constructor(context: ISlideContext) {
    super(context);
  }

  async onReady() {
    return true;
  };

  setup(props: Record<string, any>, vue: VueInstance, context: ISlideContext) {
    const { h, reactive, computed, ref } = vue;

    const slide = reactive(this.context.slide) as IPublicSlide;

    const bgColor = computed(() => {
      if (slide.data.background_color)
        return COLOR_CLASSES[slide.data.background_color as keyof ColorClasses];
    })
    const title = ref(slide.data.title)
    const message = ref(slide.data.message)

    this.context.onPlay(async () => {
      this.context.anime({
        targets: "#title",
        translateY: [80, 0],
        opacity: [0, 1],
        duration: 500,
        easing: 'linear'
      });
      this.context.anime({
        targets: "#message",
        translateY: [80, 0],
        opacity: [0, 1],
        duration: 500,
        delay: 300,
        easing: 'linear'
      });
      console.log("ON PLAY CALLED")
    });

    this.context.onEnded(async () => {
    });

    return {
      template: require('./SimpleMessage.cmn').default,
      data: {
        title: title,
        message: message,
        bgColor: bgColor
      }
    }
  }
}
