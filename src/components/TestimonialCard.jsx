import React from 'react';
import { Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export const TestimonialCard = ({ testimonial }) => {
  return (
    <Card 
      className="hover:shadow-lg transition-all duration-300 border border-gray-200 h-full"
      data-testid={`testimonial-card-${testimonial.id}`}
    >
      <CardContent className="p-6">
        {/* Star Rating */}
        <div className="flex mb-4" data-testid={`rating-${testimonial.id}`}>
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
          ))}
        </div>

        {/* Quote */}
        <p className="text-gray-700 mb-4 italic">"{testimonial.quote}"</p>

        {/* Customer Info */}
        <div>
          <p className="font-semibold text-gray-900">{testimonial.name}</p>
          <p className="text-sm text-gray-600">{testimonial.title}</p>
        </div>
      </CardContent>
    </Card>
  );
};
