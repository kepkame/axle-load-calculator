import { useSelector } from 'react-redux';
import { selectStep1FormData } from '@store/slices/step1FormSlice/step1FormSlice.selectors';
import { selectStep2DraftData } from '@store/slices/step2FormSlice/step2FormSlice.selectors';
import { useFormCargoSchema } from '@entities/step2Form/hooks/useFormCargoSchema';
import { getCargoFormConstraints } from '../utils/getCargoFormConstraints';

/**
 * Configures Step 2 form: schema, constraints, and context.
 */
export const useStep2FormConfig = () => {
  const step1Data = useSelector(selectStep1FormData);
  const step2DraftData = useSelector(selectStep2DraftData);

  const deckLengthMM = step1Data.deckLength * 1000;
  const schema = useFormCargoSchema(deckLengthMM);
  const constraints = getCargoFormConstraints();

  return {
    schema,
    deckLengthMM,
    constraints,
    defaultValues: step2DraftData,
  };
};
