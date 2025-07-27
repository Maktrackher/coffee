import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = 'Reserve Cold - Премиальный холодный кофе',
  description = 'Откройте для себя мягкие, насыщенные вкусы нашего тщательно приготовленного холодного кофе. Изготовлен из премиальных зерен и заварен до совершенства в течение 24 часов.',
  image = 'https://melodious-syrniki-4e4279.netlify.app/og-image.jpg',
  url = 'https://melodious-syrniki-4e4279.netlify.app',
  type = 'website'
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Reserve Cold" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Reserve Cold" />
      <link rel="canonical" href={url} />
    </Helmet>
  );
};

export default SEOHead;