import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShieldCheck, Search, AlertCircle, CheckCircle2, Award } from 'lucide-react';
import { certificateService, type CertificateRecord } from '@/services/certificateService';
import { Card, Button, Input, Badge } from '@/components/ui';

export const VerifyCertificatePage: React.FC = () => {
  const { certificateHash: routeHash } = useParams<{ certificateHash: string }>();
  const [searchHash, setSearchHash] = useState(routeHash || 'HASH-SP-2026-984021');
  const [verifiedRecord, setVerifiedRecord] = useState<CertificateRecord | null>(
    certificateService.verifyCertificateHash(searchHash)
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const record = certificateService.verifyCertificateHash(searchHash.trim());
    setVerifiedRecord(record);
  };

  return (
    <div className="space-y-8 select-none max-w-2xl mx-auto py-8">
      <div className="text-center space-y-2">
        <div className="w-16 h-16 rounded-2xl bg-purple-600/30 text-purple-400 border border-purple-500/40 flex items-center justify-center mx-auto shadow-xl">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Digital Certificate Verification</h1>
        <p className="text-xs text-slate-400">
          Verify the authenticity of StudyPilot AI Certificates with cryptographic hash verification
        </p>
      </div>

      {/* Search Input */}
      <Card className="p-6">
        <form onSubmit={handleSearch} className="flex gap-2">
          <Input
            value={searchHash}
            onChange={(e) => setSearchHash(e.target.value)}
            placeholder="Enter Certificate Verification Hash (e.g. HASH-SP-2026-984021)"
            className="text-xs"
          />
          <Button type="submit" leftIcon={<Search className="w-4 h-4" />}>
            Verify
          </Button>
        </form>
      </Card>

      {/* Verification Result */}
      {verifiedRecord ? (
        <Card className="p-8 text-center space-y-6 border-2 border-emerald-500/40 bg-gradient-to-b from-emerald-950/40 via-slate-900 to-slate-900 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border-4 border-emerald-500 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <Badge variant="success" size="md">Authentic Certificate Verified ✓</Badge>
            <h2 className="text-xl font-bold text-white">Issued to {verifiedRecord.studentName}</h2>
            <p className="text-xs text-purple-300 font-semibold">{verifiedRecord.courseTitle}</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-left text-xs space-y-2 font-mono">
            <div className="flex justify-between text-slate-400">
              <span>Verification Hash:</span>
              <span className="text-emerald-400 font-bold">{verifiedRecord.verificationHash}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Date Issued:</span>
              <span className="text-white">{verifiedRecord.issueDate}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Issuer:</span>
              <span className="text-white">StudyPilot AI Learning Platform</span>
            </div>
          </div>

          <Link to={`/certificate/${verifiedRecord.id}`}>
            <Button variant="outline" className="w-full" leftIcon={<Award className="w-4 h-4" />}>
              View Full Certificate Canvas
            </Button>
          </Link>
        </Card>
      ) : (
        <Card className="p-8 text-center space-y-4 border border-rose-500/30 bg-rose-950/20">
          <AlertCircle className="w-12 h-12 text-rose-400 mx-auto" />
          <h3 className="text-base font-bold text-white">Invalid Verification Hash</h3>
          <p className="text-xs text-slate-400">
            No active certificate record matched hash <strong className="text-rose-300">{searchHash}</strong>.
          </p>
        </Card>
      )}
    </div>
  );
};
