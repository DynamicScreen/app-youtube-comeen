import {
  ISlideOptionsContext,
  SlideOptionsModule, VueInstance
} from "@comeen/comeen-play-sdk-js";

export default class YouTubePlayerOptionsModule extends SlideOptionsModule {
  constructor(context: ISlideOptionsContext) {
    super(context);
  }

  async onReady() {
    return true;
  };

  setup(props: Record<string, any>, vue: VueInstance, context: ISlideOptionsContext) {
    const { h, computed, watchEffect } = vue;

    const update = context.update;

    const { Field, TextInput, Toggle } = this.context.components

    context.updateAutoName(this.t("app.name"))

    const valid = computed(() => update.option("url").modelValue?.length > 0)
    watchEffect(() => context.updateValidationStatus(valid.value))

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
