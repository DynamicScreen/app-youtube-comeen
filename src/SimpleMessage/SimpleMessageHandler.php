<?php

namespace DynamicScreen\Message\SimpleMessage;

use DynamicScreen\SdkPhp\Handlers\SlideHandler;
use DynamicScreen\SdkPhp\Interfaces\ISlide;
use DynamicScreen\SdkPhp\Interfaces\IDisplay;

class SimpleMessageHandler extends SlideHandler
{

    public function fetch(ISlide $slide, IDisplay $display): void
    {
        $this->addSlide([
            'title' => $slide->getOption('title', ""),
            'message' => $slide->getOption('message', ""),
            'background_color' => $slide->getOption('background_color', "blue"),
        ]);
    }
}
