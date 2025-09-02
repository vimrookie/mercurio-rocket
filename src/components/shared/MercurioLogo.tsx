import React from 'react';
import { Box, keyframes } from '@mui/material';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-8px);
  }
`;

interface MercurioLogoProps {
  size?: number;
  minimal?: boolean;
  animated?: boolean;
}

const MercurioLogo: React.FC<MercurioLogoProps> = ({ size = 60, minimal = false, animated = true }) => {
  if (minimal) {
    return (
      <Box
        sx={{
          width: size,
          height: size,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #E0E0E0 0%, #BDBDBD 30%, #9E9E9E 70%, #757575 100%)',
          margin: '0 auto',
          boxShadow: '0 4px 20px rgba(117, 117, 117, 0.4)',
        }}
      />
    );
  }

  return (
    <Box
      sx={{
        position: 'relative',
        width: size,
        height: size,
        margin: '0 auto',
        animation: animated ? `${float} 4s ease-in-out infinite` : 'none',
      }}
    >
      {/* Orbital ring */}
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: size * 1.3,
          height: size * 1.3,
          transform: 'translate(-50%, -50%)',
          border: '1px solid rgba(224, 224, 224, 0.3)',
          borderRadius: '50%',
          animation: animated ? `${rotate} 30s linear infinite` : 'none',
        }}
      />

      {/* Mercurio Planet Core */}
      <Box
        sx={{
          position: 'relative',
          width: size,
          height: size,
          borderRadius: '50%',
          background: `
            radial-gradient(circle at 30% 30%, #F5F5F5, #E0E0E0),
            radial-gradient(circle at 70% 70%, #BDBDBD, #9E9E9E)
          `,
          backgroundBlendMode: 'multiply',
          boxShadow: `
            inset -6px -6px 12px rgba(0, 0, 0, 0.4),
            inset 6px 6px 12px rgba(255, 255, 255, 0.2),
            0 0 25px rgba(158, 158, 158, 0.4),
            0 0 50px rgba(158, 158, 158, 0.2)
          `,
          overflow: 'hidden',
        }}
      >
        {/* Surface craters - realistic Mercurio surface */}
        <Box
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            background: `
              radial-gradient(circle at 25% 35%, rgba(0, 0, 0, 0.3) 4%, transparent 12%),
              radial-gradient(circle at 75% 25%, rgba(0, 0, 0, 0.25) 2%, transparent 8%),
              radial-gradient(circle at 60% 75%, rgba(0, 0, 0, 0.35) 3%, transparent 10%),
              radial-gradient(circle at 40% 60%, rgba(0, 0, 0, 0.2) 2%, transparent 7%),
              radial-gradient(circle at 80% 70%, rgba(0, 0, 0, 0.25) 2%, transparent 6%),
              radial-gradient(circle at 15% 80%, rgba(0, 0, 0, 0.3) 3%, transparent 9%)
            `,
          }}
        />
        
        {/* Subtle surface texture */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            background: `
              repeating-linear-gradient(
                45deg,
                transparent,
                transparent 2px,
                rgba(0, 0, 0, 0.02) 2px,
                rgba(0, 0, 0, 0.02) 4px
              )
            `,
          }}
        />
        
        {/* Atmospheric highlight */}
        <Box
          sx={{
            position: 'absolute',
            top: '10%',
            left: '10%',
            width: '35%',
            height: '35%',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%)',
          }}
        />
      </Box>
    </Box>
  );
};

export default MercurioLogo;