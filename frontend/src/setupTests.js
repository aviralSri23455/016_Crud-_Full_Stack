import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';
import { configure } from '@testing-library/react';

// Override the default act function
configure({ asyncUtilTimeout: 5000, act: act });