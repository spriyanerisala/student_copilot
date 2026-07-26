export interface CertificateRecord {
  id: string;
  studentName: string;
  courseTitle: string;
  category: string;
  issueDate: string;
  verificationHash: string;
  instructorName: string;
  instructorTitle: string;
  qrCodeUri: string;
}

export const certificateService = {
  getCertificateData(id: string = 'cert-dbms-101'): CertificateRecord {
    return {
      id,
      studentName: 'Ahnaf Ibn Habib',
      courseTitle: 'Database Management Systems (DBMS) Mastery',
      category: 'Computer Science & Software Engineering',
      issueDate: 'July 26, 2026',
      verificationHash: 'HASH-SP-2026-984021',
      instructorName: 'Dr. Sarah Jenkins',
      instructorTitle: 'Principal Systems Architect & Lead AI Instructor',
      qrCodeUri: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://studypilot.ai/verify-certificate/HASH-SP-2026-984021',
    };
  },

  verifyCertificateHash(hash: string): CertificateRecord | null {
    if (hash === 'HASH-SP-2026-984021' || hash === 'HASH-DEMO') {
      return this.getCertificateData('cert-dbms-101');
    }
    return null;
  },
};
