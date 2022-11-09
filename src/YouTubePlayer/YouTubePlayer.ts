import {
  ISlideContext,
  IPublicSlide,
  SlideModule
} from "@comeen/comeen-play-sdk-js";

import { nextTick } from 'vue';
import { h } from "vue"

import YouTubePlayer from 'youtube-player'

export default class YouTubePlayerSlideModule extends SlideModule {
  constructor(context: ISlideContext) {
    super(context);
  }

  async onReady() {
    return true;
  };

  // @ts-ignore
  setup(props: Record<string, any>, vue: VueInstance, context: ISlideContext) {
    const { h, reactive, ref } = vue;

    const slide = reactive(props.slide) as IPublicSlide;
    this.context = reactive(props.slide.context);

    const url = ref(slide.data.url);
    const enableCC = ref(slide.data.enable_cc);
    const disableAnnotations = ref(slide.data.disable_annotations);

    let player: any = null;

    const initPlayer = () => {
      const playerVars: any = {
        controls: 0,
        showinfo: 0,
        rel: 0,
        disablekb: 1,
        modestbranding: 1,
        iv_load_policy: disableAnnotations.value ? 3 : 1,
      }
      if (enableCC.value) {
        playerVars.cc_load_policy = 1
      }

      player = YouTubePlayer(`ytb-${slide.id}`, {
        height: '100%',
        width: '100%',
        playerVars: playerVars,
      })
      let videoId = this.getVideoId(url.value)
      player.loadVideoById(videoId)
      console.log("youtube", player)

      let firstTimeAutoplaying = true;
      player.on('stateChange', (event) => {
        console.log("youtube", event.data)
        if (event.data === 0) {
          this.context.playbackManager.next();
        } else if (event.data === 3) {
        } else if (event.data === 1) {
          if (firstTimeAutoplaying) {
            player.pauseVideo();
            firstTimeAutoplaying = false;
          }
        }
      })
      player.on('error', () => {
        console.log("youtube", "error")
        this.context.playbackManager.next();
      })
    }

    this.context.onPrepare(async () => {
      nextTick(() => initPlayer());
    });

    this.context.onReplay(async () => {
      if (player) {
        player.seekTo(0)
        player.playVideo()
      }
    });

    this.context.onPlay(async () => {
      console.log("youtube", "play", player)
      if (player) {
        console.log("playing");
        this.context.playbackManager.preventNextSlide(1000);
        player.playVideo();
      }
    });

    this.context.onPause(async () => {
      console.log('Message: onPause')
      if(player) {
        player.pauseVideo();
      }
    });
    this.context.onResume(async () => {
      console.log('Message: onResume')

      if(player) {
        player.playVideo();
      }
    });

    this.context.onEnded(async () => {
      if (player) {
        console.log("youtube", "ending")
        player.stopVideo()
        player.destroy()
      }
    });

    return () =>
      h("div", {
        class: "flex w-full h-full"
      }, [
        h('div', {
          id: `ytb-${slide.id}`
        })
      ])
  }

  /**
     * Get YouTube ID from various YouTube URL
     * @author: takien
     * @url: http://takien.com
     * For PHP YouTube parser, go here http://takien.com/864
     * https://gist.github.com/takien/4077195
     */
  getVideoId(url) {
    let id = '';
    url = url.replace(/(>|<)/gi, '').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    if (url[2] !== undefined) {
      id = url[2].split(/[^0-9a-z_\-]/i);
      id = id[0];
    }
    else {
      id = url;
    }
    return id;
  }
}
