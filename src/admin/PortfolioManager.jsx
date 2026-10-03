import React, { useState } from 'react';
import { CASES_DATA as initialCases } from '../data/CasesData';
import Modal from '../components/ui/Modal';
import { Plus, Edit2, Trash2, CheckCircle2, TrendingUp, Sparkles } from 'lucide-react';

export default function PortfolioManager() {
  const [cases, setCases] = useState(() => {
    try {
      const saved = localStorage.getItem('shift_admin_cases');
      return saved ? JSON.parse(saved) : initialCases;
    } catch {
      return initialCases;
    }
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCase, setEditingCase] = useState(null);

  const [formData, setFormData] = useState({
    titleHy: '',
    category: 'restaurant',
    tagHy: '',
    shortDescHy: '',
    beforeImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80',
    afterImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=900&q=80',
    beforeFollowers: '1,000',
    afterFollowers: '15,000',
    afterRoas: '4.5x'
  });

  const saveToStorage = (updated) => {
    setCases(updated);
    localStorage.setItem('shift_admin_cases', JSON.stringify(updated));
  };

  const handleOpenCreate = () => {
    setEditingCase(null);
    setFormData({
      titleHy: '',
      category: 'restaurant',
      tagHy: 'Ռեստորաններ',
      shortDescHy: '',
      beforeImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80',
      afterImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=900&q=80',
      beforeFollowers: '1,000',
      afterFollowers: '15,000',
      afterRoas: '4.5x'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (c) => {
    setEditingCase(c);
    setFormData({
      titleHy: c.titleHy,
      category: c.category,
      tagHy: c.tagHy,
      shortDescHy: c.shortDescHy,
      beforeImage: c.beforeImage,
      afterImage: c.afterImage,
      beforeFollowers: c.beforeMetrics?.followers || '1,000',
      afterFollowers: c.afterMetrics?.followers || '15,000',
      afterRoas: c.afterMetrics?.roas || '4.5x'
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (!window.confirm('Հեռացնե՞լ այս քեյսը։')) return;
    const updated = cases.filter((c) => c.id !== id);
    saveToStorage(updated);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (editingCase) {
      const updated = cases.map((c) =>
        c.id === editingCase.id
          ? {
              ...c,
              titleHy: formData.titleHy,
              category: formData.category,
              tagHy: formData.tagHy,
              shortDescHy: formData.shortDescHy,
              beforeImage: formData.beforeImage,
              afterImage: formData.afterImage,
              beforeMetrics: { ...c.beforeMetrics, followers: formData.beforeFollowers },
              afterMetrics: { ...c.afterMetrics, followers: formData.afterFollowers, roas: formData.afterRoas }
            }
          : c
      );
      saveToStorage(updated);
    } else {
      const newCase = {
        id: String(Date.now()),
        titleHy: formData.titleHy,
        titleEn: formData.titleHy,
        category: formData.category,
        tagHy: formData.tagHy,
        tagEn: formData.tagHy,
        shortDescHy: formData.shortDescHy,
        shortDescEn: formData.shortDescHy,
        beforeImage: formData.beforeImage,
        afterImage: formData.afterImage,
        beforeMetrics: { followers: formData.beforeFollowers, reach: '10,000', leads: '10', roas: '—' },
        afterMetrics: { followers: formData.afterFollowers, reach: '250,000', leads: '150', roas: formData.afterRoas },
        duration: '3 ամիս',
        servicesUsedHy: ['SMM', 'Meta Ads'],
        servicesUsedEn: ['SMM', 'Meta Ads']
      };
      saveToStorage([newCase, ...cases]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Պորտֆոլիոյի & Քեյսերի Կառավարում</h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            Ավելացրեք նոր Before/After քեյսեր, խմբագրեք ցուցանիշները կամ հեռացրեք հները։
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="btn-neon px-5 py-2.5 rounded-xl text-xs font-black flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Ավելացնել Նոր Քեյս</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cases.map((c) => (
          <div key={c.id} className="p-6 rounded-3xl glass-panel border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase bg-[#b4f846]/10 text-[#b4f846] border border-[#b4f846]/20">
                {c.tagHy}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenEdit(c)}
                  className="p-1.5 rounded-lg bg-white/5 text-neutral-300 hover:text-white"
                  title="Խմբագրել"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(c.id)}
                  className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20"
                  title="Հեռացնել"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <h3 className="text-lg font-black text-white">{c.titleHy}</h3>
            <p className="text-xs text-neutral-400 line-clamp-2">{c.shortDescHy}</p>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="h-28 rounded-xl overflow-hidden relative">
                <img src={c.beforeImage} alt="Before" className="w-full h-full object-cover" />
                <span className="absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded bg-black/80 text-[9px] font-bold text-neutral-300">
                  Before: {c.beforeMetrics?.followers}
                </span>
              </div>
              <div className="h-28 rounded-xl overflow-hidden relative border border-[#b4f846]/40">
                <img src={c.afterImage} alt="After" className="w-full h-full object-cover" />
                <span className="absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded bg-black/80 text-[9px] font-bold text-[#b4f846]">
                  After: {c.afterMetrics?.followers} ({c.afterMetrics?.roas})
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingCase ? 'Խմբագրել Քեյսը' : 'Ավելացնել Նոր Քեյս'}
      >
        <form onSubmit={handleFormSubmit} className="space-y-3 text-xs">
          <div>
            <label className="block text-neutral-300 font-bold mb-1">Վերնագիր / Բրենդի Անուն</label>
            <input
              type="text"
              required
              value={formData.titleHy}
              onChange={(e) => setFormData({ ...formData, titleHy: e.target.value })}
              placeholder="«Lavash Garden» Ռեստորան"
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-neutral-300 font-bold mb-1">Կատեգորիա</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-[#12141a] border border-white/10 text-white"
              >
                <option value="restaurant">Ռեստորաններ</option>
                <option value="real-estate">Անշարժ Գույք</option>
                <option value="ecommerce">E-commerce</option>
                <option value="beauty">Գեղեցկություն & Բժշկություն</option>
              </select>
            </div>
            <div>
              <label className="block text-neutral-300 font-bold mb-1">Թեգ</label>
              <input
                type="text"
                value={formData.tagHy}
                onChange={(e) => setFormData({ ...formData, tagHy: e.target.value })}
                placeholder="Հյուրընկալություն"
                className="w-full px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-neutral-300 font-bold mb-1">Նկարագրություն</label>
            <textarea
              rows={2}
              value={formData.shortDescHy}
              onChange={(e) => setFormData({ ...formData, shortDescHy: e.target.value })}
              placeholder="Ինչպես հասանք արդյունքի..."
              className="w-full px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-neutral-300 font-bold mb-1">Before Հետևորդներ</label>
              <input
                type="text"
                value={formData.beforeFollowers}
                onChange={(e) => setFormData({ ...formData, beforeFollowers: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white"
              />
            </div>
            <div>
              <label className="block text-neutral-300 font-bold mb-1">After Հետևորդներ</label>
              <input
                type="text"
                value={formData.afterFollowers}
                onChange={(e) => setFormData({ ...formData, afterFollowers: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-neutral-300 font-bold mb-1">ROAS / Եկամտաբերություն</label>
            <input
              type="text"
              value={formData.afterRoas}
              onChange={(e) => setFormData({ ...formData, afterRoas: e.target.value })}
              placeholder="5.4x"
              className="w-full px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white"
            />
          </div>

          <button
            type="submit"
            className="btn-neon w-full py-3 rounded-xl text-xs font-black cursor-pointer mt-2"
          >
            {editingCase ? 'ՊԱՀՊԱՆԵԼ ՓՈՓՈԽՈՒԹՅՈՒՆՆԵՐԸ' : 'ԱՎԵԼԱՑՆԵԼ ՔԵՅՍԸ'}
          </button>
        </form>
      </Modal>
    </div>
  );
}
