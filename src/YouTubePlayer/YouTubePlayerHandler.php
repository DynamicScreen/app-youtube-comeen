<?php

namespace Comeen\YouTube\YouTubePlayer;

use ComeenPlay\SdkPhp\Handlers\SlideHandler;
use ComeenPlay\SdkPhp\Interfaces\ISlide;
use ComeenPlay\SdkPhp\Interfaces\IDisplay;

class YouTubePlayerHandler extends SlideHandler
{
    public function fetch(ISlide $slide, IDisplay $display): void
    {
        $this->addSlide([
            'url' => $slide->getOption('url', ""),
            'enable_cc' => $slide->getOption('enable_cc', 1),
            'disable_annotations' => $slide->getOption('disable_annotations', 1),
        ]);
    }

    public function getValidations($options = null): array
    {
        return [
            'rules' => [
                'url' => ['required', 'regex:/^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/']
            ],
            'messages' => [
                'url.regex' => $this->getTranslation('modules.player.options.url_error')
            ],
        ];
    }
}
