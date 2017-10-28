
import { GlobalLoading, LocalLoading, Themes, Styles} from './index';

test('exported correctly', ()=>{
	expect(GlobalLoading).toBeDefined();
	expect(LocalLoading).toBeDefined();
	expect(Themes).toBeDefined();
	expect(Styles).toBeDefined();
})
