/**
 * @file uploadDocumentos.js
 * @description Este arquivo gerencia o envio de documentos de identificação para o Firebase no processo "Know Your Fan". 
 * Ele permite que o usuário envie um arquivo de imagem (PNG, JPEG, JPG), extraia a data de nascimento do documento usando OCR (Tesseract.js),
 * verifique se o usuário é maior de idade e faça o upload para o Firebase Storage. A URL do documento é salva no Firestore associado ao usuário.
 * O sistema também gerencia o progresso do upload e exibe os documentos enviados.
 *
 * @module uploadDocumentos
 * @returns {JSX.Element} Componente para upload de documentos, incluindo preview, validação da idade e visualização de documentos enviados.
 *
 * @example
 * // Uso em um componente React:
 * import UploadDocumentos from './uploadDocumentos';
 * 
 * export default function App() {
 *   return <UploadDocumentos />;
 * }
 *
 * @dependencies
 * - firebase/firestore (doc, updateDoc)
 * - firebase/storage (ref, uploadBytesResumable, getDownloadURL)
 * - tesseract.js (Tesseract.recognize)
 * - lucide-react (CloudUpload, Eye, FolderOpen, Trash, File)
 */

import { useState } from "react";
import { auth, db, storage } from "../../../firebase/firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Navbar from "../../../components/Navbar";
import Tesseract from "tesseract.js";
import styles from "./upload.module.css";
import { CloudUpload, Eye, FolderOpen, Trash, File } from "lucide-react";

export default function UploadDocumentos() {
  const [documento, setDocumento] = useState<File | null>(null);
  const [progresso, setProgresso] = useState(0);
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");
  const [dataExtraida, setDataExtraida] = useState<string | null>(null);
  const [maiorDeIdade, setMaiorDeIdade] = useState<boolean | null>(null);
  const [processando, setProcessando] = useState(false);
  const [uploadedDocs, setUploadedDocs] = useState<{
    nome: string;
    data: string;
    tamanho: string;
    status: string;
    url: string;
  }[]>([]);

  const calcularMaioridade = (data: string) => {
    const [dia, mes, ano] = data.split("/");
    const nascimento = new Date(`${ano}-${mes}-${dia}`);
    const hoje = new Date();
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mesDiff = hoje.getMonth() - nascimento.getMonth();
    const diaDiff = hoje.getDate() - nascimento.getDate();
    if (mesDiff < 0 || (mesDiff === 0 && diaDiff < 0)) idade -= 1;
    return idade;
  };

  const extrairDataNascimento = async (file: File): Promise<string | null> => {
    const result = await Tesseract.recognize(file, "por", {
      logger: (m) => console.log(m),
    });
    const texto = result.data.text;
    const match = texto.match(/\d{2}\/\d{2}\/\d{4}/);
    return match ? match[0] : null;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (!allowedTypes.includes(file.type)) {
      setErro("Formato inválido. Use apenas PNG, JPEG ou JPG (sem PDF).");
      return;
    }
    setErro("");
    setMensagem("");
    setDocumento(file);
    setDataExtraida(null);
    setMaiorDeIdade(null);
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!documento) return;

    setProcessando(true);
    setErro("");
    setMensagem("");
    setDataExtraida(null);
    setMaiorDeIdade(null);

    const documentoAtual = documento;
    try {
      const data = await extrairDataNascimento(documentoAtual);
      if (!data) {
        throw new Error("Não foi possível encontrar a data de nascimento no documento.");
      }

      const idade = calcularMaioridade(data);
      setDataExtraida(data);
      setMaiorDeIdade(idade >= 18);
      if (idade < 18) {
        throw new Error("Verificação falhou: Usuário menor de idade");
      }

      const uid = auth.currentUser?.uid;
      if (!uid) {
        throw new Error("Usuário não autenticado.");
      }

      const ext = documentoAtual.name.split(".").pop();
      const storageRef = ref(storage, `documentos/${uid}/rg.${ext}`);
      const uploadTask = uploadBytesResumable(storageRef, documentoAtual);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setProgresso(progress);
        },
        (error) => {
          throw new Error(`Erro no upload: ${error.message}`);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          const userRef = doc(db, "usuarios", uid);
          await updateDoc(userRef, {
            documentoRgUrl: downloadURL,
            idadeVerificada: true,
            dataNascimentoExtraida: data,
          });

          setMensagem("Documento enviado e verificação concluída!");

          setUploadedDocs((prev) => [
            ...prev,
            {
              nome: documentoAtual.name,
              data: new Date().toLocaleString(),
              tamanho: `${(documentoAtual.size / 1024).toFixed(2)} KB`,
              status: "Enviado",
              url: downloadURL,
            },
          ]);
        }
      );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      setErro(error.message || "Erro durante o processamento do documento.");
    } finally {
      setProcessando(false);
      setProgresso(0);
    }
  };

  const handleDeleteDocument = (index: number) => {
    setUploadedDocs((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className={styles.container}>
      <Navbar />
      <form className={styles.form} onSubmit={handleUpload}>
        <h2>Upload de Documentos</h2>
        <p>Envie uma imagem do documento visível</p>

        {erro && <div className={styles.error}>{erro}</div>}
        {mensagem && <div className={styles.success}>{mensagem}</div>}

        {/* Área de Upload */}
        <div className={styles.fieldGroup}>
          <CloudUpload size={48} className={styles.uploadIcon} />
          <p>Arraste e solte seu arquivo aqui</p>
          <p>(PNG, JPG ou JPEG)</p>
          <p className={styles.small}>ou</p>
          <button
            type="button"
            className={styles.uploadBtn}
            onClick={() => document.getElementById("fileInput")?.click()}
            disabled={processando}
          >
            <FolderOpen size={20} /> <span>Selecione o Arquivo</span>
          </button>
          <input
            id="fileInput"
            type="file"
            accept=".png, .jpg, .jpeg"
            onChange={handleFileChange}
            disabled={processando}
            style={{ display: "none" }}
          />
          {documento && (
            <div className={styles.preview}>
              <img src={URL.createObjectURL(documento)} alt="Prévia do documento" />
              <div className={styles.fileInfo}>
                <File size={16} />
                <span>{documento.name}</span>
              </div>
            </div>
          )}
        </div>

        {/* Resultados OCR */}
        {dataExtraida && (
          <div className={styles.result}>
            <p><strong>Data extraída:</strong> {dataExtraida}</p>
            <p><strong>Maior de idade:</strong> {maiorDeIdade ? "Sim ✅" : "Não ❌"}</p>
          </div>
        )}

        {progresso > 0 && (
          <div className={styles.progressBar}>
            <div className={styles.progress} style={{ width: `${progresso}%` }} >
              {progresso}%
            </div>
          </div>
        )}

        <button
          type="submit"
          className={styles.submitBtn}
          disabled={!documento || processando}
        >
          {processando ? "Processando..." : "Enviar Documento"}
        </button>

        {/* Lista de documentos */}
        <div className={styles.documentsList}>
          <h4>Documentos Enviados</h4>
          {uploadedDocs.length === 0 ? (
            <p>Nenhum documento enviado ainda.</p>
          ) : (
            uploadedDocs.map((doc, index) => (
              <div className={styles.documentItem} key={index}>
                <div className={styles.documentIcon}>
                  <File size={24} />
                </div>
                <div className={styles.documentInfo}>
                  <div className={styles.documentName}>{doc.nome}</div>
                  <div className={styles.documentDetails}>
                    {doc.data} - {doc.tamanho}
                  </div>
                </div>
                <div className={styles.documentActions}>
                  <a href={doc.url} target="_blank" rel="noopener noreferrer" className={styles.actionBtn}>
                    <Eye size={16} /> Visualizar
                  </a>
                  <button className={styles.actionBtn} onClick={() => handleDeleteDocument(index)}>
                    <Trash size={16} /> Excluir
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </form>
    </div>
  );
}
