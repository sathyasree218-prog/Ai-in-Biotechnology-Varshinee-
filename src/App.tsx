/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import SkincareForm from './components/SkincareForm';
import AnalysisResult from './components/AnalysisResult';
import { UserProfile } from './types';
import { Loader2 } from 'lucide-react';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export default function App() {
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async (data: UserProfile) => {
    setIsLoading(true);
    try {
      const prompt = `
        You are an AI skincare assistant designed to help users manage acne using scientific and dermatology-based knowledge.
        
        User Profile:
        - Age: ${data.age}
        - Gender: ${data.gender}
        - Skin Type: ${data.skinType}
        - Acne Severity: ${data.acneSeverity}
        - Acne Types: ${data.acneType.join(', ')}
        - Lifestyle: Diet: ${data.lifestyle.diet}, Sleep: ${data.lifestyle.sleep}, Stress: ${data.lifestyle.stress}, Water: ${data.lifestyle.waterIntake}
        - Current Products: ${data.currentProducts}
        - Researcher/Student Mode: ${data.isResearcher ? 'YES' : 'NO'}

        Please provide a detailed analysis following this structure:
        1. Skin Analysis: Explain how age, gender, and skin type influence their specific acne.
        2. Acne Care Recommendations: Evidence-based suggestions (cleansing, moisturizing, sunscreen, lifestyle, diet).
        3. Ingredient-Based Recommendation: Scientifically supported ingredients suitable for their skin type.
        4. Face Cream Recommendation: Ideal formulation (active ingredients, concentrations, base cream type).
        5. Safety Advice: Precautions and when to see a dermatologist.
        6. Personalized Routine: Simple morning and night routine.
        ${data.isResearcher ? '7. Research Insights: Suggest natural bioactive ingredients for formulation research.' : ''}

        Keep the tone professional, educational, and empathetic. Use Markdown for formatting.
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });

      setAnalysis(response.text || "Sorry, I couldn't generate an analysis at this time.");
    } catch (error) {
      console.error("Error generating analysis:", error);
      setAnalysis("An error occurred while generating your analysis. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4">
      {isLoading ? (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <Loader2 className="w-12 h-12 text-brand-800 animate-spin mb-4" />
          <p className="text-brand-800 font-serif text-xl italic">Analyzing your skin profile...</p>
        </div>
      ) : analysis ? (
        <AnalysisResult content={analysis} onBack={() => setAnalysis(null)} />
      ) : (
        <SkincareForm onSubmit={handleFormSubmit} />
      )}
    </div>
  );
}

