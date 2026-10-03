import React, { useState } from 'react';
import { BLOG_DATA as initialBlog } from '../data/BlogData';
import Modal from '../components/ui/Modal';
import { BookOpen, Plus, Trash2, Edit2, Clock } from 'lucide-react';

export default function BlogManager() {
  const [posts, setPosts] = useState(() => {
    try {
      const saved = localStorage.getItem('shift_admin_blog');
      return saved ? JSON.parse(saved) : initialBlog;
    } catch {
      return initialBlog;
    }
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    titleHy: '',
    category: 'smm',
    categoryLabelHy: 'SMM & Ալգորիթմներ',
    author: 'Shift Team',
    summaryHy: '',
    contentHy: '',
    coverImage: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1200&q=80'
  });

  const savePosts = (updated) => {
    setPosts(updated);
    localStorage.setItem('shift_admin_blog', JSON.stringify(updated));
  };

  const handleDelete = (id) => {
    if (!window.confirm('Հեռացնե՞լ այս հոդվածը։')) return;
    const updated = posts.filter((p) => p.id !== id);
    savePosts(updated);
  };

  const handleCreate = (e) => {
    e.preventDefault();
    const newPost = {
      id: String(Date.now()),
      slug: `article-${Date.now()}`,
      titleHy: formData.titleHy,
      titleEn: formData.titleHy,
      category: formData.category,
      categoryLabelHy: formData.categoryLabelHy,
      categoryLabelEn: formData.categoryLabelHy,
      date: new Date().toISOString().split('T')[0],
      readTimeHy: '5 րոպե ընթերցանություն',
      readTimeEn: '5 min read',
      author: formData.author,
      coverImage: formData.coverImage,
      summaryHy: formData.summaryHy,
      summaryEn: formData.summaryHy,
      contentHy: `<p>${formData.contentHy.replace(/\n/g, '</p><p>')}</p>`,
      contentEn: `<p>${formData.contentHy.replace(/\n/g, '</p><p>')}</p>`
    };

    savePosts([newPost, ...posts]);
    setIsModalOpen(false);
    setFormData({
      titleHy: '',
      category: 'smm',
      categoryLabelHy: 'SMM & Ալգորիթմներ',
      author: 'Shift Team',
      summaryHy: '',
      contentHy: '',
      coverImage: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1200&q=80'
    });
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Բլոգի & Հոդվածների Կառավարում</h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            Ավելացրեք նոր հոդվածներ, կառավարեք վերնագրերն ու կատեգորիաները։
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn-neon px-5 py-2.5 rounded-xl text-xs font-black flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Ավելացնել Հոդված</span>
        </button>
      </div>

      <div className="space-y-4">
        {posts.map((p) => (
          <div
            key={p.id}
            className="p-5 rounded-2xl glass-panel border border-white/10 flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-4">
              <img
                src={p.coverImage}
                alt={p.titleHy}
                className="w-16 h-16 rounded-xl object-cover shrink-0"
              />
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase text-[#b4f846]">
                  {p.categoryLabelHy}
                </span>
                <h3 className="text-sm sm:text-base font-bold text-white line-clamp-1">
                  {p.titleHy}
                </h3>
                <p className="text-[11px] text-neutral-400">
                  {p.author} • {p.date}
                </p>
              </div>
            </div>

            <button
              onClick={() => handleDelete(p.id)}
              className="p-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20"
              title="Հեռացնել"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Ավելացնել Նոր Հոդված"
      >
        <form onSubmit={handleCreate} className="space-y-3 text-xs">
          <div>
            <label className="block text-neutral-300 font-bold mb-1">Վերնագիր</label>
            <input
              type="text"
              required
              value={formData.titleHy}
              onChange={(e) => setFormData({ ...formData, titleHy: e.target.value })}
              placeholder="Instagram 2026 Ալգորիթմները..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-neutral-300 font-bold mb-1">Կատեգորիա</label>
              <select
                value={formData.category}
                onChange={(e) => {
                  const cat = e.target.value;
                  const label =
                    cat === 'smm'
                      ? 'SMM & Ալգորիթմներ'
                      : cat === 'ads'
                      ? 'Թիրախային Գովազդ'
                      : 'Բրենդինգ';
                  setFormData({ ...formData, category: cat, categoryLabelHy: label });
                }}
                className="w-full px-3 py-2 rounded-xl bg-[#12141a] border border-white/10 text-white"
              >
                <option value="smm">SMM & Ալգորիթմներ</option>
                <option value="ads">Թիրախային Գովազդ</option>
                <option value="branding">Բրենդինգ</option>
              </select>
            </div>
            <div>
              <label className="block text-neutral-300 font-bold mb-1">Հեղինակ</label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-neutral-300 font-bold mb-1">Հակիրճ Նկարագրություն (Summary)</label>
            <textarea
              rows={2}
              required
              value={formData.summaryHy}
              onChange={(e) => setFormData({ ...formData, summaryHy: e.target.value })}
              placeholder="Հոդվածի գլխավոր միտքը..."
              className="w-full px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white resize-none"
            />
          </div>

          <div>
            <label className="block text-neutral-300 font-bold mb-1">Հոդվածի Տեքստը (Text Content)</label>
            <textarea
              rows={5}
              required
              value={formData.contentHy}
              onChange={(e) => setFormData({ ...formData, contentHy: e.target.value })}
              placeholder="Գրեք հոդվածի բովանդակությունը այստեղ..."
              className="w-full px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white resize-none"
            />
          </div>

          <button
            type="submit"
            className="btn-neon w-full py-3 rounded-xl text-xs font-black cursor-pointer mt-2"
          >
            ՀՐԱՊԱՐԱԿԵԼ ՀՈԴՎԱԾԸ
          </button>
        </form>
      </Modal>
    </div>
  );
}
