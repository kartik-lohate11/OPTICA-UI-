import React from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export const LensOptionCard = ({ lens }) => {
  return (
    <Card 
      className="hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-gray-300"
      data-testid={`lens-card-${lens.id}`}
    >
      <CardContent className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3">{lens.name}</h3>
        <p className="text-sm text-gray-600 mb-4">{lens.description}</p>
        
        <ul className="space-y-2 mb-6">
          {lens.features.map((feature, index) => (
            <li key={index} className="flex items-start text-sm text-gray-700">
              <Check className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <Button 
          variant="outline" 
          className="w-full hover:bg-gray-900 hover:text-white transition-colors"
          data-testid={`select-lens-${lens.id}`}
        >
          Select {lens.name}
        </Button>
      </CardContent>
    </Card>
  );
};
