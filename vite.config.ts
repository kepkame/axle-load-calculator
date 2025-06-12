import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), svgr()],
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@features': path.resolve(__dirname, 'src/features'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@layouts': path.resolve(__dirname, 'src/layouts'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@store': path.resolve(__dirname, 'src/store'),
      '@shared-constants': path.resolve(__dirname, 'src/shared/constants'),
      '@shared-types': path.resolve(__dirname, 'src/shared/types'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@utils': path.resolve(__dirname, 'src/utils'),
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  build: {
    rollupOptions: {
      output: {
        // Customizing paths for different types of resources
        assetFileNames: (assetInfo) => {
          const ext = assetInfo.name?.split('.').pop(); // Get file extension

          // Fonts (woff, woff2, ttf, otf)
          if (/\.(woff|woff2|ttf|eot|otf)$/.test(assetInfo.name || '')) {
            return 'assets/fonts/[name]-[hash][extname]';
          }
          // SVG-icons
          if (ext === 'svg') {
            return 'assets/icons/[name]-[hash][extname]';
          }
          // Images (jpg, jpeg, png, webp)
          if (/\.(jpg|jpeg|png|webp)$/.test(assetInfo.name || '')) {
            return 'assets/images/[name]-[hash][extname]';
          }
          // Other files
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
  },
});
