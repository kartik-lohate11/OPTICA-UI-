import React, { useEffect, useState } from 'react';
import '@/App.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { LensOptionCard } from '@/components/LensOptionCard';
import { TestimonialCard } from '@/components/TestimonialCard';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { ArrowRight, Package, Shield, Truck, Award, Eye, Sparkles, Search } from 'lucide-react';
import { products, lensOptions, testimonials, brands, faqs } from '@/data/staticData';

function App() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="App bg-white">
      <Header />

      {/* Hero Section */}
      <section 
        className={`pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        data-testid="hero-section"
      >
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-6 inline-block px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-700 animate-fade-in">
            Premium Eyewear Collection 2025
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight animate-fade-in-up">
            Premium Vision,<br />Perfectly Crafted
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-10 max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
            Discover luxury eyewear that combines exceptional style with precision optics
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-400">
            <Button 
              size="lg" 
              className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-6 text-base group"
              data-testid="hero-explore-button"
            >
              Explore Collection
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="px-8 py-6 text-base hover:bg-gray-50"
              data-testid="hero-book-test-button"
            >
              <Eye className="mr-2 h-5 w-5" />
              Book Eye Test
            </Button>
          </div>

          {/* Benefits Bar */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { icon: Truck, text: 'Free Shipping Over $200' },
              { icon: Package, text: '30-Day Returns' },
              { icon: Shield, text: '1-Year Warranty' }
            ].map((benefit, index) => (
              <div 
                key={index} 
                className="flex items-center justify-center gap-3 p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
                data-testid={`benefit-${index}`}
              >
                <benefit.icon className="h-6 w-6 text-gray-700" />
                <span className="text-sm font-medium text-gray-700">{benefit.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white" data-testid="featured-products-section">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Featured Collection</h2>
            <p className="text-lg text-gray-600">Handpicked styles from top designers</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.slice(0, 3).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Premium Lens Options */}
      <section id="lenses" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50" data-testid="lens-options-section">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Premium Lens Options</h2>
            <p className="text-lg text-gray-600">Advanced technology for superior vision</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lensOptions.map((lens) => (
              <LensOptionCard key={lens.id} lens={lens} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white" data-testid="why-choose-us-section">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
            <p className="text-lg text-gray-600">Experience the OPTICA difference</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Sparkles,
                title: 'Premium Quality',
                description: 'Handcrafted frames using the finest materials and traditional techniques for lasting durability.'
              },
              {
                icon: Award,
                title: 'Expert Care',
                description: 'Professional eye exams and personalized fitting service from certified opticians.'
              },
              {
                icon: Truck,
                title: 'Free Shipping',
                description: 'Complimentary shipping on all orders over $200 with tracking and insurance included.'
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="text-center p-8 rounded-lg border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                data-testid={`feature-${index}`}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-6">
                  <feature.icon className="h-8 w-8 text-gray-900" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Explore Our Collection */}
      <section id="products" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50" data-testid="collection-section">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Explore Our Collection</h2>
            <p className="text-lg text-gray-600 mb-8">Find your perfect pair from our curated selection</p>
            
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input 
                  placeholder="Search frames by name or brand..." 
                  className="pl-10 h-12"
                  data-testid="search-input"
                />
              </div>
              <Button variant="outline" className="h-12" data-testid="reset-filters-button">
                Reset Filters
              </Button>
            </div>
            <p className="text-sm text-gray-600">Showing {products.length} of {products.length} products</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-16 px-4 sm:px-6 lg:px-8 bg-white" data-testid="testimonials-section">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <p className="text-lg text-gray-600">Trusted by thousands of satisfied customers</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* Service Guarantees */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50" data-testid="guarantees-section">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Package,
                title: '30-Day Returns',
                description: 'Not satisfied? Return your glasses within 30 days for a full refund, no questions asked.'
              },
              {
                icon: Shield,
                title: 'Warranty Included',
                description: 'All frames come with a 1-year warranty covering manufacturing defects and damage.'
              },
              {
                icon: Truck,
                title: 'Same-Day Service',
                description: 'Need them fast? Rush processing available with 2-day delivery on select frames.'
              }
            ].map((service, index) => (
              <div 
                key={index} 
                className="text-center p-8 bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-all"
                data-testid={`service-${index}`}
              >
                <div className="inline-flex items-center justify-center w-14 h-14 bg-gray-100 rounded-full mb-4">
                  <service.icon className="h-7 w-7 text-gray-900" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-sm text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted Brands */}
      <section id="brands" className="py-16 px-4 sm:px-6 lg:px-8 bg-white" data-testid="brands-section">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Trusted Premium Brands</h2>
            <p className="text-lg text-gray-600">We carry the world's finest eyewear designers</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {brands.map((brand) => (
              <div 
                key={brand.id} 
                className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-md transition-all hover:-translate-y-1"
                data-testid={`brand-${brand.id}`}
              >
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 border border-gray-200">
                  <span className="text-2xl font-bold text-gray-900">{brand.initial}</span>
                </div>
                <p className="text-sm font-semibold text-gray-900">{brand.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50" data-testid="faq-section">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600">Everything you need to know about OPTICA</p>
          </div>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq) => (
              <AccordionItem 
                key={faq.id} 
                value={`item-${faq.id}`} 
                className="bg-white border border-gray-200 rounded-lg px-6"
                data-testid={`faq-item-${faq.id}`}
              >
                <AccordionTrigger className="text-left font-semibold text-gray-900 hover:no-underline py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default App;
