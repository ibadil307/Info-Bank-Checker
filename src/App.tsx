import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster, toast } from 'react-hot-toast';
import { 
  Building2, 
  Wallet, 
  Search, 
  ArrowLeft, 
  Loader2,
  CreditCard,
  Building,
  CircleDollarSign,
  Landmark,
  BadgeCheck,
  Info
} from 'lucide-react';
import axios from 'axios';
import { clsx } from 'clsx';

type AccountCategory = 'bank' | 'ewallet' | '';
type AccountInfo = {
  account_bank: string;
  account_holder: string;
  account_number: string;
};

function App() {
  const [category, setCategory] = useState<AccountCategory>('');
  const [bank, setBank] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AccountInfo | null>(null);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const openCreatorInfo = () => {
    window.open('https://portofolio.ibadil.web.id', '_blank');
  };

  const bankOptions = {
    bank: [
      { value: 'bca', label: 'BCA', icon: <Building2 /> },
      { value: 'mandiri', label: 'Mandiri', icon: <Landmark /> },
      { value: 'bni', label: 'BNI', icon: <Building /> },
      { value: 'bri', label: 'BRI', icon: <Building2 /> },
      { value: 'bsm', label: 'BSI (Bank Syariah Indonesia)', icon: <CircleDollarSign /> },
      { value: 'bca_syr', label: 'BCA Syariah', icon: <CircleDollarSign /> },
      { value: 'btn', label: 'BTN / BTN Syariah', icon: <Building /> },
      { value: 'cimb', label: 'CIMB Niaga / CIMB Niaga Syariah', icon: <Building2 /> },
      { value: 'dbs', label: 'DBS Bank Indonesia', icon: <Building /> },
      { value: 'btpn', label: 'BTPN / Jenius / BPTN Wow!', icon: <Building2 /> },
      { value: 'kesejahteraan_ekonomi', label: 'Seabank / Bank BKE', icon: <Building /> },
      { value: 'danamon', label: 'Danamon / Danamon Syariah', icon: <Building2 /> },
      { value: 'muamalat', label: 'Muamalat', icon: <CircleDollarSign /> },
      { value: 'artos', label: 'Bank Jago', icon: <Building /> },
      { value: 'hana', label: 'LINE Bank / KEB Hana', icon: <Building2 /> },
      { value: 'royal', label: 'blu by BCA Digital', icon: <CreditCard /> },
      { value: 'nationalnobu', label: 'Nobu (Nationalnobu) Bank', icon: <Building /> },
      { value: 'permata', label: 'Bank Permata', icon: <Building2 /> },
      { value: 'bii', label: 'Maybank Indonesia', icon: <Building /> },
      { value: 'panin', label: 'Panin Bank', icon: <Building2 /> },
      { value: 'uob', label: 'TMRW / UOB', icon: <Building /> },
      { value: 'ocbc', label: 'OCBC NISP', icon: <Building2 /> },
      { value: 'citibank', label: 'Citibank', icon: <Building /> },
      { value: 'artha', label: 'Bank Artha Graha Internasional', icon: <Building2 /> },
      { value: 'standard_chartered', label: 'Standard Chartered Bank', icon: <Building /> },
      { value: 'anz', label: 'ANZ Indonesia', icon: <Building2 /> },
      { value: 'hsbc', label: 'HSBC Indonesia', icon: <Building /> },
      { value: 'mayapada', label: 'Bank Mayapada', icon: <Building2 /> },
      { value: 'bjb', label: 'BJB', icon: <Building /> },
      { value: 'dki', label: 'Bank DKI Jakarta', icon: <Building2 /> },
      { value: 'daerah_istimewa', label: 'BPD DIY', icon: <Building /> },
      { value: 'jawa_tengah', label: 'Bank Jateng', icon: <Building2 /> },
      { value: 'jawa_timur', label: 'Bank Jatim', icon: <Building /> },
      { value: 'jambi', label: 'Bank Jambi', icon: <Building2 /> },
      { value: 'sumut', label: 'Bank Sumut', icon: <Building /> },
      { value: 'sumatera_barat', label: 'Bank Sumbar (Bank Nagari)', icon: <Building2 /> },
      { value: 'riau_dan_kepri', label: 'Bank Riau Kepri', icon: <Building /> },
      { value: 'sumsel_dan_babel', label: 'Bank Sumsel Babel', icon: <Building2 /> },
      { value: 'lampung', label: 'Bank Lampung', icon: <Building /> },
      { value: 'kalimantan_selatan', label: 'Bank Kalsel', icon: <Building2 /> },
      { value: 'kalimantan_barat', label: 'Bank Kalbar', icon: <Building /> },
      { value: 'kalimantan_timur', label: 'Bank Kaltimtara', icon: <Building2 /> },
      { value: 'kalimantan_tengah', label: 'Bank Kalteng', icon: <Building /> },
      { value: 'sulselbar', label: 'Bank Sulselbar', icon: <Building2 /> },
      { value: 'sulut', label: 'Bank SulutGo', icon: <Building /> },
      { value: 'nusa_tenggara_barat', label: 'Bank NTB Syariah', icon: <CircleDollarSign /> },
      { value: 'bali', label: 'BPD Bali', icon: <Building2 /> },
      { value: 'nusa_tenggara_timur', label: 'Bank NTT', icon: <Building /> },
      { value: 'maluku', label: 'Bank Maluku', icon: <Building2 /> },
      { value: 'papua', label: 'Bank Papua', icon: <Building /> },
      { value: 'bengkulu', label: 'Bank Bengkulu', icon: <Building2 /> },
      { value: 'sulawesi', label: 'Bank Sulteng', icon: <Building /> },
      { value: 'sulawesi_tenggara', label: 'Bank Sultra', icon: <Building2 /> },
      { value: 'sinarmas', label: 'Bank Sinarmas', icon: <Building /> },
      { value: 'maspion', label: 'Bank Maspion Indonesia', icon: <Building2 /> },
      { value: 'ganesha', label: 'Bank Ganesha', icon: <Building /> },
      { value: 'mega', label: 'Bank Mega', icon: <Building2 /> },
      { value: 'mega_syr', label: 'Bank Mega Syariah', icon: <CircleDollarSign /> },
      { value: 'commonwealth', label: 'Commonwealth Bank', icon: <Building /> },
      { value: 'aceh', label: 'Bank Aceh Syariah', icon: <CircleDollarSign /> }
    ],
    ewallet: [
      { value: 'ovo', label: 'OVO', icon: <Wallet /> },
      { value: 'dana', label: 'DANA', icon: <Wallet /> },
      { value: 'linkaja', label: 'LinkAja', icon: <Wallet /> },
      { value: 'gopay', label: 'GoPay', icon: <Wallet /> },
      { value: 'shopeepay', label: 'ShopeePay', icon: <Wallet /> },
    ],
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!bank || !accountNumber) {
      toast.error('Mohon lengkapi semua field');
      return;
    }

    if (!/^\d+$/.test(accountNumber)) {
      toast.error('Nomor rekening hanya boleh berisi angka');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('https://cekrekening-api.belibayar.online/api/v1/account-inquiry', {
        account_bank: bank,
        account_number: accountNumber,
      });

      if (response.data.success) {
        setResult(response.data.data);
        toast.success('Rekening ditemukan!');
      } else {
        toast.error(response.data.message || 'Rekening tidak ditemukan');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setResult(null);
    setCategory('');
    setBank('');
    setAccountNumber('');
  };

  if (initialLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            duration: 0.5,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="text-blue-600"
        >
          <CreditCard className="w-16 h-16" />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <Toaster position="top-center" />
      
      {/* Creator Info Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={openCreatorInfo}
        className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm text-blue-600 p-3 rounded-full shadow-lg hover:bg-white transition-all duration-300 group"
      >
        <Info className="w-6 h-6 group-hover:animate-pulse" />
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8"
      >
        <AnimatePresence mode="wait">
          {!result ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <CreditCard className="w-8 h-8 text-blue-600" />
                </motion.div>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Cek Rekening</h1>
                <p className="text-gray-600">Periksa detail rekening bank atau e-wallet</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kategori Akun
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={() => setCategory('bank')}
                      className={clsx(
                        "p-4 rounded-lg border-2 flex flex-col items-center gap-2 transition-colors",
                        category === 'bank'
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : "border-gray-200 hover:border-gray-300"
                      )}
                    >
                      <Building2 className="w-6 h-6" />
                      <span>Bank</span>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={() => setCategory('ewallet')}
                      className={clsx(
                        "p-4 rounded-lg border-2 flex flex-col items-center gap-2 transition-colors",
                        category === 'ewallet'
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : "border-gray-200 hover:border-gray-300"
                      )}
                    >
                      <Wallet className="w-6 h-6" />
                      <span>E-Wallet</span>
                    </motion.button>
                  </div>
                </div>

                {category && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pilih {category === 'bank' ? 'Bank' : 'E-Wallet'}
                    </label>
                    <div className="relative">
                      <select
                        value={bank}
                        onChange={(e) => setBank(e.target.value)}
                        className="w-full p-3 pl-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow appearance-none"
                      >
                        <option value="">Pilih opsi</option>
                        {bankOptions[category].map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                        {bank ? bankOptions[category].find(opt => opt.value === bank)?.icon : 
                          category === 'bank' ? <Building2 className="w-5 h-5" /> : <Wallet className="w-5 h-5" />}
                      </div>
                    </div>
                  </motion.div>
                )}

                {bank && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nomor Rekening
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                        placeholder="Masukkan nomor rekening"
                        className="w-full p-3 pl-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                      />
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                        <CreditCard className="w-5 h-5" />
                      </div>
                    </div>
                  </motion.div>
                )}

                {category && bank && accountNumber && (
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Loader2 className="w-5 h-5" />
                      </motion.div>
                    ) : (
                      <>
                        <Search className="w-5 h-5" />
                        Cek Rekening
                      </>
                    )}
                  </motion.button>
                )}
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="space-y-6"
            >
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <BadgeCheck className="w-8 h-8 text-green-600" />
                </motion.div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Rekening Ditemukan!</h2>
              </div>

              <div className="space-y-4">
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="bg-gray-50 p-4 rounded-lg"
                >
                  <p className="text-sm text-gray-600">Bank/E-Wallet</p>
                  <p className="text-lg font-medium text-gray-900">{result.account_bank.toUpperCase()}</p>
                </motion.div>
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="bg-gray-50 p-4 rounded-lg"
                >
                  <p className="text-sm text-gray-600">Nama Pemilik</p>
                  <p className="text-lg font-medium text-gray-900">{result.account_holder}</p>
                </motion.div>
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="bg-gray-50 p-4 rounded-lg"
                >
                  <p className="text-sm text-gray-600">Nomor Rekening</p>
                  <p className="text-lg font-medium text-gray-900">{result.account_number}</p>
                </motion.div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={resetForm}
                className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Cek Rekening Lain
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default App;
