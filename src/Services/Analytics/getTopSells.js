import { collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../../Firebase';

const getTopSells = async (category = 'all') => {
  let querySearch;

  if (category === 'all') {
    querySearch = query(collection(db, 'analytics/visits/per-product'), orderBy('amount', 'desc'), limit(10));
  } else {
    querySearch = query(collection(db, 'analytics/visits/per-product'), where('category', '==', category));
  }

  const docs = await getDocs(querySearch);
  let analyticsFragment = [];
  docs.forEach((doc) => {
    analyticsFragment.push(doc.data());
  });

  if (category) {
    return analyticsFragment.sort((a, b) => b.amount - a.amount).slice(0, 11);
  } else {
    return analyticsFragment;
  }
};

export default getTopSells;
