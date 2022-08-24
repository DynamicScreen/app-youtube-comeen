import {
  ISlideOptionsContext,
  SlideOptionsModule, VueInstance
} from "dynamicscreen-sdk-js";

export default class YouTubePlayerOptionsModule extends SlideOptionsModule {
  constructor(context: ISlideOptionsContext) {
    super(context);
  }

  async onReady() {
    return true;
  };

  setup(props: Record<string, any>, vue: VueInstance, context: ISlideOptionsContext) {
    const { h } = vue;

    const update = context.update;

    const { Field, TextInput, Toggle } = this.context.components

    return () =>
      h("div", {}, [
        h(Field, { label: this.t('modules.player.options.url') }, [
          h(TextInput, {
            ...update.option("url"),
            placeholder: this.t('modules.player.options.url_placeholder')
          })
        ]),
        // @ts-ignore
        h(Toggle, {...update.option("enable_cc", { default: true }), class: 'mt-4' }, {
          default: () => this.t('modules.player.options.enable_cc')
        }),
        // @ts-ignore
        h(Toggle, {...update.option("disable_annotations", { default: true }), class: 'mt-4' }, {
          default: () => this.t('modules.player.options.disable_annotations')
        })
      ]
    )
  }
}
