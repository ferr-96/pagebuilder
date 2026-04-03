import { registry } from './registry';

import { headerBlockDefinition } from './HeaderBlock/definition';
import HeaderBlock from './HeaderBlock/HeaderBlock';

import { heroBlockDefinition } from './HeroBlock/definition';
import HeroBlock from './HeroBlock/HeroBlock';

import { textBlockDefinition } from './TextBlock/definition';
import TextBlock from './TextBlock/TextBlock';

import { imageBlockDefinition } from './ImageBlock/definition';
import ImageBlock from './ImageBlock/ImageBlock';

import { buttonBlockDefinition } from './ButtonBlock/definition';
import ButtonBlock from './ButtonBlock/ButtonBlock';

import { gridBlockDefinition } from './GridBlock/definition';
import GridBlock from './GridBlock/GridBlock';

import { spacerBlockDefinition } from './SpacerBlock/definition';
import SpacerBlock from './SpacerBlock/SpacerBlock';

import { videoBlockDefinition } from './VideoBlock/definition';
import VideoBlock from './VideoBlock/VideoBlock';

import { testimonialBlockDefinition } from './TestimonialBlock/definition';
import TestimonialBlock from './TestimonialBlock/TestimonialBlock';

import { pricingBlockDefinition } from './PricingBlock/definition';
import PricingBlock from './PricingBlock/PricingBlock';

import { contactFormBlockDefinition } from './ContactFormBlock/definition';
import ContactFormBlock from './ContactFormBlock/ContactFormBlock';

import { footerBlockDefinition } from './FooterBlock/definition';
import FooterBlock from './FooterBlock/FooterBlock';

registry.register(headerBlockDefinition, HeaderBlock);
registry.register(heroBlockDefinition, HeroBlock);
registry.register(textBlockDefinition, TextBlock);
registry.register(imageBlockDefinition, ImageBlock);
registry.register(buttonBlockDefinition, ButtonBlock);
registry.register(gridBlockDefinition, GridBlock);
registry.register(spacerBlockDefinition, SpacerBlock);
registry.register(videoBlockDefinition, VideoBlock);
registry.register(testimonialBlockDefinition, TestimonialBlock);
registry.register(pricingBlockDefinition, PricingBlock);
registry.register(contactFormBlockDefinition, ContactFormBlock);
registry.register(footerBlockDefinition, FooterBlock);

export { registry };
