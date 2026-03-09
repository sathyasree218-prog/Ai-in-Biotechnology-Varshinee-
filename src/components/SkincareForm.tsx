import React, { useState } from 'react';
import { UserProfile, SkinType, AcneSeverity, AcneType } from '../types';
import { Sparkles, User, Droplets, Activity, ClipboardList, FlaskConical } from 'lucide-react';
import { motion } from 'motion/react';

interface Props {
  onSubmit: (data: UserProfile) => void;
}

const SKIN_TYPES: SkinType[] = ['oily', 'dry', 'combination', 'sensitive', 'normal'];
const SEVERITIES: AcneSeverity[] = ['mild', 'moderate', 'severe'];
const ACNE_TYPES: AcneType[] = ['whiteheads', 'blackheads', 'papules', 'pustules', 'nodules', 'cystic acne'];

export default function SkincareForm({ onSubmit }: Props) {
  const [formData, setFormData] = useState<UserProfile>({
    age: '',
    gender: '',
    skinType: 'normal',
    acneSeverity: 'mild',
    acneType: [],
    lifestyle: {
      diet: '',
      sleep: '',
      stress: '',
      waterIntake: '',
    },
    currentProducts: '',
    isResearcher: false,
  });

  const handleAcneTypeToggle = (type: AcneType) => {
    setFormData(prev => ({
      ...prev,
      acneType: prev.acneType.includes(type)
        ? prev.acneType.filter(t => t !== type)
        : [...prev.acneType, type]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto p-6"
    >
      <div className="text-center mb-12">
        <h1 className="text-5xl mb-4">Your Skin Journey</h1>
        <p className="text-brand-800/60 max-w-lg mx-auto italic">
          Tell us about your skin, and our AI dermatologist will craft a personalized scientific routine for you.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-12">
        {/* Basic Info */}
        <section className="glass-card p-8">
          <div className="flex items-center gap-3 mb-6">
            <User className="w-5 h-5 text-brand-800" />
            <h2 className="text-2xl">Basic Information</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Age</label>
              <input
                type="number"
                required
                className="input-field"
                placeholder="e.g. 25"
                value={formData.age}
                onChange={e => setFormData({ ...formData, age: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Gender</label>
              <select
                required
                className="input-field"
                value={formData.gender}
                onChange={e => setFormData({ ...formData, gender: e.target.value })}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="non-binary">Non-binary</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
            </div>
          </div>
        </section>

        {/* Skin Profile */}
        <section className="glass-card p-8">
          <div className="flex items-center gap-3 mb-6">
            <Droplets className="w-5 h-5 text-brand-800" />
            <h2 className="text-2xl">Skin Profile</h2>
          </div>
          <div className="space-y-8">
            <div>
              <label className="block text-sm font-medium mb-4">Skin Type</label>
              <div className="flex flex-wrap gap-3">
                {SKIN_TYPES.map(type => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setFormData({ ...formData, skinType: type })}
                    className={`px-6 py-2 rounded-full border transition-all ${
                      formData.skinType === type
                        ? 'bg-brand-800 text-white border-brand-800'
                        : 'bg-white text-brand-800 border-brand-200 hover:border-brand-800'
                    }`}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-4">Acne Severity</label>
              <div className="flex flex-wrap gap-3">
                {SEVERITIES.map(severity => (
                  <button
                    key={severity}
                    type="button"
                    onClick={() => setFormData({ ...formData, acneSeverity: severity })}
                    className={`px-6 py-2 rounded-full border transition-all ${
                      formData.acneSeverity === severity
                        ? 'bg-brand-800 text-white border-brand-800'
                        : 'bg-white text-brand-800 border-brand-200 hover:border-brand-800'
                    }`}
                  >
                    {severity.charAt(0).toUpperCase() + severity.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-4">Acne Types (Select all that apply)</label>
              <div className="flex flex-wrap gap-3">
                {ACNE_TYPES.map(type => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => handleAcneTypeToggle(type)}
                    className={`px-6 py-2 rounded-full border transition-all ${
                      formData.acneType.includes(type)
                        ? 'bg-brand-800 text-white border-brand-800'
                        : 'bg-white text-brand-800 border-brand-200 hover:border-brand-800'
                    }`}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Lifestyle */}
        <section className="glass-card p-8">
          <div className="flex items-center gap-3 mb-6">
            <Activity className="w-5 h-5 text-brand-800" />
            <h2 className="text-2xl">Lifestyle Factors</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Diet</label>
              <input
                className="input-field"
                placeholder="e.g. High dairy, vegan, etc."
                value={formData.lifestyle.diet}
                onChange={e => setFormData({ ...formData, lifestyle: { ...formData.lifestyle, diet: e.target.value } })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Sleep (hours/night)</label>
              <input
                className="input-field"
                placeholder="e.g. 7-8 hours"
                value={formData.lifestyle.sleep}
                onChange={e => setFormData({ ...formData, lifestyle: { ...formData.lifestyle, sleep: e.target.value } })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Stress Level</label>
              <input
                className="input-field"
                placeholder="e.g. High, moderate, low"
                value={formData.lifestyle.stress}
                onChange={e => setFormData({ ...formData, lifestyle: { ...formData.lifestyle, stress: e.target.value } })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Water Intake</label>
              <input
                className="input-field"
                placeholder="e.g. 2 liters/day"
                value={formData.lifestyle.waterIntake}
                onChange={e => setFormData({ ...formData, lifestyle: { ...formData.lifestyle, waterIntake: e.target.value } })}
              />
            </div>
          </div>
        </section>

        {/* Current Routine */}
        <section className="glass-card p-8">
          <div className="flex items-center gap-3 mb-6">
            <ClipboardList className="w-5 h-5 text-brand-800" />
            <h2 className="text-2xl">Current Routine</h2>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">What products are you currently using?</label>
            <textarea
              className="input-field min-h-[100px] resize-none"
              placeholder="List your cleanser, moisturizer, etc."
              value={formData.currentProducts}
              onChange={e => setFormData({ ...formData, currentProducts: e.target.value })}
            />
          </div>
        </section>

        {/* Researcher Toggle */}
        <section className="glass-card p-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FlaskConical className="w-5 h-5 text-brand-800" />
              <div>
                <h2 className="text-xl">Researcher / Student Mode</h2>
                <p className="text-sm text-brand-800/60">Include natural bioactive ingredient suggestions for formulation research.</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, isResearcher: !formData.isResearcher })}
              className={`w-14 h-8 rounded-full transition-all relative ${
                formData.isResearcher ? 'bg-brand-800' : 'bg-brand-200'
              }`}
            >
              <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${
                formData.isResearcher ? 'left-7' : 'left-1'
              }`} />
            </button>
          </div>
        </section>

        <div className="flex justify-center pt-8">
          <button type="submit" className="btn-primary flex items-center gap-2 text-lg">
            <Sparkles className="w-5 h-5" />
            Generate My Analysis
          </button>
        </div>
      </form>
    </motion.div>
  );
}
