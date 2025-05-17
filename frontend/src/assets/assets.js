import favicon from "./favicon.svg"
import star_icon from './star_icon.svg'
import rating_star from './rating_star.svg'
import sample_img_1 from './sample_img_1.png'
import sample_img_2 from './sample_img_2.png'
import profile_img_1 from './profile_img_1.png'
import profile_img_2 from './profile_img_2.png'
import profile_img_3 from './profile_img_3.png'
import step_icon_1 from './step_icon_1.svg'
import step_icon_2 from './step_icon_2.svg'
import step_icon_3 from './step_icon_3.svg'
import email_icon from './email_icon.svg'
import lock_icon from './lock_icon.svg'
import cross_icon from './cross_icon.svg'
import star_group from './star_group.png'
import credit_star from './credit_star.svg'
import profile_icon from './profile_icon.png'
import download_icon from "./download_icon.svg"
import no_image from "./no_image.png"

export const assets = {
    favicon,
    star_icon,
    rating_star,
    sample_img_1,
    sample_img_2,
    email_icon,
    lock_icon,
    cross_icon,
    star_group,
    credit_star,
    profile_icon,
    download_icon,
    no_image
}

export const stepsData = [
    {
      title: 'Describe Your Vision',
      description: 'Type a phrase, sentence, or paragraph that describes the image you want to create.',
      icon: step_icon_1,
    },
    {
      title: 'Watch the Magic',
      description: 'Our AI-powered engine will transform your text into a high-quality, unique image in seconds.',
      icon: step_icon_2,
    },
    {
      title: 'Download & Generate another',
      description: 'Instantly download your creation from our platform and generate another image.',
      icon: step_icon_3,
    },
    {
    title: 'See History',
    description: 'See your previously generated image in history section.',
    icon: step_icon_1,
    },
  ];

export const testimonialsData = [
  {
    "image": profile_img_1,
    "name": "Rajesh Sharma",
    "role": "Graphic Designer",
    "stars": 5,
    "text": "I've been using bg.removal for over two years, mainly for my projects, and it has made editing effortless and quick."
  },
  {
    "image": profile_img_2,
    "name": "Amit Verma",
    "role": "Content Creator",
    "stars": 5,
    "text": "This tool has been a game-changer for my content creation. It's super easy to use and saves me so much time."
  },
  {
    "image": profile_img_3,
    "name": "Priya Iyer",
    "role": "Graphic Designer",
    "stars": 5,
    "text": "I’ve relied on bg.removal for my designs, and it never disappoints. It’s smooth, accurate, and extremely efficient."
  }
]


export const plans = [
    {
      id: 'Basic',
      price: 100,
      credits: 10,
      desc: 'Best for personal use.'
    },
    {
      id: 'Advanced',
      price: 500,
      credits: 60,
      desc: 'Best for business use.'
    },
    {
      id: 'Business',
      price: 1000,
      credits: 150,
      desc: 'Best for enterprise use.'
    },
  ]